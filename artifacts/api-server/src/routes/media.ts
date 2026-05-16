import { Router } from "express";
import { verifyToken, parseRequestToken } from "../lib/auth";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";

const ALLOWED_TYPES = new Set(["image", "podcast"]);

const router = Router();

router.post("/media", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] ?? req.ip ?? "unknown");
  const { limited } = rateLimit(`${ip}:media`, 10, 60_000);
  if (limited) return res.status(429).json({ error: "Too many requests" });

  const token = parseRequestToken(req.headers as { cookie?: string; authorization?: string });
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Invalid or expired token" });

  const body = req.body as Record<string, unknown>;
  const type = typeof body.type === "string" ? body.type : null;
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : null;

  if (!type || !prompt) return res.status(400).json({ error: "type and prompt are required" });
  if (!ALLOWED_TYPES.has(type)) {
    return res.status(400).json({ error: `type must be one of: ${[...ALLOWED_TYPES].join(", ")}` });
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return res.status(503).json({ error: "Media generation is not configured (OPENAI_API_KEY missing)" });
  }

  try {
    if (type === "image") {
      const r = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_KEY}` },
        body: JSON.stringify({ prompt, n: 1, size: "1024x1024" }),
      });
      const data = (await r.json()) as { data?: Array<{ url?: string; b64_json?: string }> };
      const entry = data.data?.[0];
      const imageUrl = entry?.url ?? (entry?.b64_json ? `data:image/png;base64,${entry.b64_json}` : null);
      if (!imageUrl) return res.status(502).json({ error: "No image returned from OpenAI" });
      return res.json({ id: `image-${Date.now()}`, type: "image", url: imageUrl });
    }

    if (type === "podcast") {
      const r = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({ model: "gpt-4o-mini-tts", voice: "alloy", input: prompt }),
      });
      if (!r.ok) {
        const detail = await r.text();
        logger.error({ status: r.status, detail }, "TTS upstream error");
        return res.status(502).json({ error: "TTS generation failed" });
      }
      const arrayBuffer = await r.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      return res.json({ id: `podcast-${Date.now()}`, type: "podcast", url: `data:audio/mpeg;base64,${base64}` });
    }

    return res.status(400).json({ error: "Unsupported media type" });
  } catch (err: unknown) {
    logger.error({ err }, "media generation error");
    return res.status(500).json({ error: "Internal error during media generation" });
  }
});

export default router;
