import { Router } from "express";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";

const router = Router();

interface GeminiCandidate {
  content?: { parts?: Array<{ text?: string }> };
}
interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?: { code?: number; message?: string; status?: string };
}

// Ordered by free-tier quota availability (most generous first)
const GEMINI_MODELS = [
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash-8b",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
];

async function callGemini(
  apiKey: string,
  payload: object,
): Promise<{ reply: string } | { error: string; status: number }> {
  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 429 || response.status === 503) {
        logger.warn({ model, status: response.status }, "Gemini model quota/unavailable, trying next");
        continue;
      }

      if (!response.ok) {
        const detail = await response.text();
        logger.error({ model, status: response.status, detail }, "Gemini upstream error");
        return { error: "Gemini request failed", status: 502 };
      }

      const data = (await response.json()) as GeminiResponse;
      const reply = data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("")
        .trim();

      if (!reply) {
        logger.error({ model }, "Gemini returned empty reply");
        return { error: "Gemini returned no reply", status: 502 };
      }

      logger.info({ model }, "Gemini replied successfully");
      return { reply };
    } catch (err: unknown) {
      logger.error({ err, model }, "Gemini fetch error");
    }
  }

  return {
    error: "All Gemini models are currently unavailable or quota exhausted. Please try again later.",
    status: 503,
  };
}

router.post("/mentor/chat", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] ?? req.ip ?? "unknown");
  const { limited } = rateLimit(`${ip}:mentor-chat`, 20, 60_000);
  if (limited) return res.status(429).json({ error: "Too many requests" });

  const body = req.body as Record<string, unknown>;
  const message = typeof body.message === "string" ? body.message.trim() : null;
  const profile = body.profile ?? null;
  const mode = typeof body.mode === "string" ? body.mode : "text";

  if (!message) return res.status(400).json({ error: "message is required" });

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return res.status(503).json({ error: "GEMINI_API_KEY is not configured" });
  }

  const systemPrompt = [
    "You are SahiPath, a focused AI career mentor for students and professionals in India.",
    "Give concise, practical, and actionable guidance.",
    "Do not mention that you are a language model.",
    "IMPORTANT — When you recommend a topic, course, or skill, ALWAYS suggest 1-2 real online resources using this exact format:",
    '  📚 COURSE: [Course Title] — [full URL]',
    "  Prefer free resources: YouTube playlists, Coursera free courses, freeCodeCamp, NPTEL, or official docs.",
    "  Example: 📚 COURSE: CS50 Introduction to Computer Science — https://www.edx.org/cs50",
    "If the user asks for a roadmap or study plan, include at least 2-3 course links covering the key topics.",
    "When you mention a topic the user should study today, end your reply with:",
    '  🔔 STUDY_TOPIC: [exact topic name]',
    "  This is used to schedule an end-of-day test reminder.",
    "Keep replies clear and plain text; avoid markdown code fences unless the user asks for code.",
  ].join(" ");

  const profileContext = profile
    ? JSON.stringify(profile, null, 2)
    : "No profile provided.";

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${systemPrompt}\n\nMode: ${mode}\n\nUser profile:\n${profileContext}\n\nUser message:\n${message}`,
          },
        ],
      },
    ],
    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
  };

  try {
    const result = await callGemini(apiKey, payload);
    if ("error" in result) {
      return res.status(result.status).json({ error: result.error });
    }
    logger.info({ mode }, "mentor chat replied");
    return res.json({ reply: result.reply });
  } catch (err: unknown) {
    logger.error({ err }, "mentor chat error");
    return res.status(500).json({ error: "Internal error during mentor chat" });
  }
});

export default router;
