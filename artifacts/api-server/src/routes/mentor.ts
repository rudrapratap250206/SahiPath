import { Router } from "express";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";

const router = Router();

interface GeminiCandidate {
  content?: { parts?: Array<{ text?: string }> };
}
interface GeminiResponse {
  candidates?: GeminiCandidate[];
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
    "You are SahiPath, a focused career mentor.",
    "Respond with concise, practical guidance.",
    "Do not mention that you are a language model.",
    "If the user asks for step-by-step help, provide actionable steps.",
    "Keep the reply plain text; avoid markdown code fences unless the user specifically asks for code.",
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
            text: `${systemPrompt}\n\nMode: ${mode}\n\nProfile context:\n${profileContext}\n\nUser message:\n${message}`,
          },
        ],
      },
    ],
    generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) },
    );

    if (!response.ok) {
      const detail = await response.text();
      logger.error({ status: response.status, detail }, "Gemini upstream error");
      return res.status(502).json({ error: "Gemini request failed" });
    }

    const data = (await response.json()) as GeminiResponse;
    const reply = data.candidates?.[0]?.content?.parts
      ?.map(p => p.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      logger.error({}, "Gemini returned empty reply");
      return res.status(502).json({ error: "Gemini returned no reply" });
    }

    logger.info({ mode }, "mentor chat replied");
    return res.json({ reply });
  } catch (err: unknown) {
    logger.error({ err }, "mentor chat error");
    return res.status(500).json({ error: "Internal error during mentor chat" });
  }
});

export default router;
