import { Router } from "express";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";

const router = Router();

router.post("/mentor/chat", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] || req.ip || "ip");
  const rl = rateLimit(`${ip}:mentor-chat`, 20, 60_000);
  if (rl.limited) return res.status(429).json({ error: "Too many requests" });

  const { message, profile, mode = "text" } = req.body || {};
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return res.status(503).json({ error: "GEMINI_API_KEY is not configured" });

  const systemPrompt = [
    "You are SahiPath, a focused career mentor.",
    "Respond with concise, practical guidance.",
    "Do not mention that you are a language model.",
    "If the user asks for step-by-step help, provide actionable steps.",
    "Keep the reply text-only and do not include markdown code fences unless needed.",
  ].join(" ");

  const profileContext = profile ? JSON.stringify(profile, null, 2) : "No profile provided.";

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
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 512,
    },
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      logger.error({ status: response.status, detail }, "Gemini upstream error");
      return res.status(502).json({ error: "Gemini request failed" });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part: any) => part?.text || "")
      .join("")
      .trim();

    if (!reply) {
      logger.error({}, "Gemini empty reply");
      return res.status(502).json({ error: "Gemini returned no reply" });
    }

    logger.info({ mode }, "mentor chat reply");
    return res.json({ reply });
  } catch (err: any) {
    logger.error({ err }, "mentor chat error");
    return res.status(500).json({ error: "Unable to generate reply" });
  }
});

export default router;
