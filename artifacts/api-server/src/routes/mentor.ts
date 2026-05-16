import { Router } from "express";
import { db } from "@workspace/db";
import { chatMessagesTable, chatSessionsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";
import { parseRequestToken, verifyToken } from "../lib/auth";
import { ai } from "@workspace/integrations-gemini-ai";

const router = Router();

interface HistoryMessage {
  role: string;
  text: string;
}

const systemPromptText = [
  "You are SahiPath, a focused AI career mentor for students and professionals in India.",
  "Give thorough, practical, and actionable guidance. Never cut a response short — always complete your full answer.",
  "Do not mention that you are a language model.",
  "IMPORTANT — When you recommend a topic, course, or skill, ALWAYS suggest 1-2 real online resources using this exact format:",
  "  📚 COURSE: [Course Title] — [full URL]",
  "  Prefer free resources: YouTube playlists, Coursera free courses, freeCodeCamp, NPTEL, or official docs.",
  "If the user asks for a roadmap or study plan, include ALL key topics with 2-3 course links covering each phase.",
  "When you mention a topic the user should study today, end your reply with: 🔔 STUDY_TOPIC: [exact topic name]",
  "If the user asks you to generate an image or create a visual, respond with ONLY: 🖼️ GENERATE_IMAGE: [detailed image generation prompt, one line]",
  "If the user asks you to create a podcast, audio content, or narration, respond with ONLY: 🎙️ GENERATE_PODCAST: [the full podcast script text, 150-200 words]",
  "Keep replies clear and plain text; avoid markdown code fences unless the user asks for code.",
].join(" ");

router.get("/mentor/sessions", async (req, res) => {
  const token = parseRequestToken(req.headers as any);
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Unauthorized" });

  try {
    const sessions = await db
      .select()
      .from(chatSessionsTable)
      .where(eq(chatSessionsTable.userId, payload.id))
      .orderBy(desc(chatSessionsTable.createdAt))
      .limit(50);
    return res.json({ sessions });
  } catch (err) {
    logger.error({ err }, "Failed to load sessions");
    return res.status(500).json({ error: "Failed to load sessions" });
  }
});

router.post("/mentor/sessions", async (req, res) => {
  const token = parseRequestToken(req.headers as any);
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Unauthorized" });

  const body = req.body as Record<string, unknown>;
  const title = typeof body.title === "string" ? body.title.slice(0, 80) : "New Chat";

  try {
    const [session] = await db
      .insert(chatSessionsTable)
      .values({ userId: payload.id, title })
      .returning();
    return res.json({ session });
  } catch (err) {
    logger.error({ err }, "Failed to create session");
    return res.status(500).json({ error: "Failed to create session" });
  }
});

router.get("/mentor/sessions/:id/messages", async (req, res) => {
  const token = parseRequestToken(req.headers as any);
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Unauthorized" });

  const sessionId = req.params.id;
  try {
    const messages = await db
      .select()
      .from(chatMessagesTable)
      .where(eq(chatMessagesTable.sessionId, sessionId))
      .orderBy(chatMessagesTable.createdAt);

    const result = messages.map((m) => ({ role: m.role, text: m.content, mode: m.mode, createdAt: m.createdAt }));
    return res.json({ messages: result });
  } catch (err) {
    logger.error({ err }, "Failed to load session messages");
    return res.status(500).json({ error: "Failed to load messages" });
  }
});

router.delete("/mentor/sessions/:id", async (req, res) => {
  const token = parseRequestToken(req.headers as any);
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Unauthorized" });

  const sessionId = req.params.id;
  try {
    await db.delete(chatMessagesTable).where(eq(chatMessagesTable.sessionId, sessionId));
    await db.delete(chatSessionsTable).where(eq(chatSessionsTable.id, sessionId));
    return res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to delete session");
    return res.status(500).json({ error: "Failed to delete session" });
  }
});

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

    const ordered = messages.reverse().map((m) => ({ role: m.role, text: m.content, mode: m.mode, createdAt: m.createdAt }));
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
    await db.delete(chatSessionsTable).where(eq(chatSessionsTable.userId, payload.id));
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
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : null;

  if (!message) return res.status(400).json({ error: "message is required" });

  const profileContext = profile ? JSON.stringify(profile, null, 2) : "No profile provided.";
  const contextPreamble = `Mode: ${mode}\n\nUser profile:\n${profileContext}`;

  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
  if (historyRaw.length > 0) {
    const recent = historyRaw.slice(-20);
    for (const msg of recent) {
      const gRole = msg.role === "assistant" ? "model" : "user";
      if (contents.length === 0 && gRole === "user") {
        contents.push({ role: "user", parts: [{ text: `${contextPreamble}\n\n${msg.text}` }] });
      } else {
        contents.push({ role: gRole, parts: [{ text: msg.text }] });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });
  } else {
    contents.push({ role: "user", parts: [{ text: `${contextPreamble}\n\nUser message:\n${message}` }] });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: systemPromptText,
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      logger.error("Gemini returned empty reply");
      return res.status(503).json({ error: "AI returned an empty response. Please try again." });
    }

    logger.info({ mode }, "Gemini replied successfully");

    const token = parseRequestToken(req.headers as any);
    if (token) {
      const tokenPayload = await verifyToken(token);
      if (tokenPayload) {
        const userId = tokenPayload.id;
        let activeSessionId = sessionId;

        if (!activeSessionId) {
          const title = message.slice(0, 60) + (message.length > 60 ? "..." : "");
          const [newSession] = await db.insert(chatSessionsTable).values({ userId, title }).returning().catch(() => [null]);
          if (newSession) activeSessionId = newSession.id;
        }

        await db.insert(chatMessagesTable).values([
          { userId, sessionId: activeSessionId, role: "user", content: message, mode },
          { userId, sessionId: activeSessionId, role: "assistant", content: reply, mode: "text" },
        ]).catch((err) => logger.warn({ err }, "Failed to save chat messages"));

        logger.info({ mode }, "mentor chat replied");
        return res.json({ reply, sessionId: activeSessionId });
      }
    }

    logger.info({ mode }, "mentor chat replied (unauthenticated)");
    return res.json({ reply });
  } catch (err: unknown) {
    logger.error({ err }, "mentor chat error");
    return res.status(503).json({ error: "AI is temporarily unavailable. Please try again." });
  }
});

export default router;
