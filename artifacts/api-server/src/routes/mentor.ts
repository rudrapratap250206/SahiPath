import { Router } from "express";
import { db } from "@workspace/db";
import { chatMessagesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";
import { parseRequestToken, verifyToken } from "../lib/auth";

const router = Router();

interface GeminiCandidate {
  content?: { parts?: Array<{ text?: string }> };
}
interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?: { code?: number; message?: string; status?: string };
}

interface HistoryMessage {
  role: string;
  text: string;
}

const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGemini(
  apiKey: string,
  payload: object,
): Promise<{ reply: string } | { error: string; status: number }> {
  const rateLimited: string[] = [];

  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 429 || response.status === 503) {
        logger.warn({ model, status: response.status }, "Gemini model rate-limited, will retry");
        rateLimited.push(model);
        continue;
      }

      if (response.status === 404) {
        const detail = await response.text();
        logger.warn({ model, detail }, "Gemini model not found, skipping");
        continue;
      }

      if (!response.ok) {
        const detail = await response.text();
        logger.error({ model, status: response.status, detail }, "Gemini upstream error");
        continue;
      }

      const data = (await response.json()) as GeminiResponse;
      const reply = data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("")
        .trim();

      if (!reply) {
        logger.error({ model }, "Gemini returned empty reply");
        continue;
      }

      logger.info({ model }, "Gemini replied successfully");
      return { reply };
    } catch (err: unknown) {
      logger.error({ err, model }, "Gemini fetch error");
    }
  }

  if (rateLimited.length > 0) {
    await sleep(3000);
    for (const model of rateLimited) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          logger.warn({ model, status: response.status }, "Gemini model retry failed");
          continue;
        }

        const data = (await response.json()) as GeminiResponse;
        const reply = data.candidates?.[0]?.content?.parts
          ?.map((p) => p.text ?? "")
          .join("")
          .trim();

        if (reply) {
          logger.info({ model }, "Gemini replied successfully on retry");
          return { reply };
        }
      } catch (err: unknown) {
        logger.error({ err, model }, "Gemini retry fetch error");
      }
    }
  }

  return {
    error: "All Gemini models are currently unavailable or quota exhausted. Please try again later.",
    status: 503,
  };
}

const systemPromptText = [
  "You are SahiPath, a focused AI career mentor for students and professionals in India.",
  "Give thorough, practical, and actionable guidance. Never cut a response short — always complete your full answer.",
  "Do not mention that you are a language model.",
  "IMPORTANT — When you recommend a topic, course, or skill, ALWAYS suggest 1-2 real online resources using this exact format:",
  "  📚 COURSE: [Course Title] — [full URL]",
  "  Prefer free resources: YouTube playlists, Coursera free courses, freeCodeCamp, NPTEL, or official docs.",
  "  Example: 📚 COURSE: CS50 Introduction to Computer Science — https://www.edx.org/cs50",
  "If the user asks for a roadmap or study plan, include ALL key topics with 2-3 course links covering each phase.",
  "When you mention a topic the user should study today, end your reply with:",
  "  🔔 STUDY_TOPIC: [exact topic name]",
  "  This is used to schedule an end-of-day test reminder.",
  "Keep replies clear and plain text; avoid markdown code fences unless the user asks for code.",
].join(" ");

router.get("/mentor/history", async (req, res) => {
  const token = parseRequestToken(req.headers as any);
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Unauthorized" });

  try {
    const messages = await db
      .select()
      .from(chatMessagesTable)
      .where(eq(chatMessagesTable.userId, payload.id))
      .orderBy(desc(chatMessagesTable.createdAt))
      .limit(100);

    const ordered = messages.reverse().map((m) => ({
      role: m.role,
      text: m.content,
      mode: m.mode,
      createdAt: m.createdAt,
    }));

    return res.json({ messages: ordered });
  } catch (err) {
    logger.error({ err }, "Failed to load chat history");
    return res.status(500).json({ error: "Failed to load history" });
  }
});

router.delete("/mentor/history", async (req, res) => {
  const token = parseRequestToken(req.headers as any);
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Unauthorized" });

  try {
    await db.delete(chatMessagesTable).where(eq(chatMessagesTable.userId, payload.id));
    return res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to clear chat history");
    return res.status(500).json({ error: "Failed to clear history" });
  }
});

router.post("/mentor/chat", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] ?? req.ip ?? "unknown");
  const { limited } = rateLimit(`${ip}:mentor-chat`, 20, 60_000);
  if (limited) return res.status(429).json({ error: "Too many requests" });

  const body = req.body as Record<string, unknown>;
  const message = typeof body.message === "string" ? body.message.trim() : null;
  const profile = body.profile ?? null;
  const mode = typeof body.mode === "string" ? body.mode : "text";
  const historyRaw = Array.isArray(body.history) ? (body.history as HistoryMessage[]) : [];

  if (!message) return res.status(400).json({ error: "message is required" });

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return res.status(503).json({ error: "GEMINI_API_KEY is not configured" });
  }

  const profileContext = profile
    ? JSON.stringify(profile, null, 2)
    : "No profile provided.";

  const contextPreamble = `Mode: ${mode}\n\nUser profile:\n${profileContext}`;

  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  if (historyRaw.length > 0) {
    const recentHistory = historyRaw.slice(-20);
    for (const msg of recentHistory) {
      const geminiRole = msg.role === "assistant" ? "model" : "user";
      if (contents.length === 0 && geminiRole === "user") {
        contents.push({ role: "user", parts: [{ text: `${contextPreamble}\n\n${msg.text}` }] });
      } else {
        contents.push({ role: geminiRole, parts: [{ text: msg.text }] });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });
  } else {
    contents.push({
      role: "user",
      parts: [{ text: `${contextPreamble}\n\nUser message:\n${message}` }],
    });
  }

  const payload = {
    system_instruction: {
      parts: [{ text: systemPromptText }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    },
  };

  try {
    const result = await callGemini(apiKey, payload);
    if ("error" in result) {
      return res.status(result.status).json({ error: result.error });
    }

    const token = parseRequestToken(req.headers as any);
    if (token) {
      const tokenPayload = await verifyToken(token);
      if (tokenPayload) {
        const userId = tokenPayload.id;
        await db.insert(chatMessagesTable).values([
          { userId, role: "user", content: message, mode },
          { userId, role: "assistant", content: result.reply, mode: "text" },
        ]).catch((err) => logger.warn({ err }, "Failed to save chat messages"));
      }
    }

    logger.info({ mode }, "mentor chat replied");
    return res.json({ reply: result.reply });
  } catch (err: unknown) {
    logger.error({ err }, "mentor chat error");
    return res.status(500).json({ error: "Internal error during mentor chat" });
  }
});

export default router;
