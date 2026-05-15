import { Router } from "express";
import { verifyToken, parseCookieToken } from "../lib/auth";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";

const router = Router();

router.post("/media", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] || req.ip || "ip");
  const rl = rateLimit(`${ip}:media`, 10, 60_000);
  if (rl.limited) return res.status(429).json({ error: "Too many requests" });

  const token = parseCookieToken(req.headers.cookie);
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Invalid token" });

  const { type, prompt } = req.body || {};
  if (!type || !prompt) return res.status(400).json({ error: "type and prompt required" });
  if (!["image", "podcast", "video", "ppt"].includes(type)) return res.status(400).json({ error: "Invalid media type" });

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) return res.status(503).json({ error: "Media generation is not configured" });

  try {
    if (type === "image") {
      const r = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({ prompt, n: 1, size: "1024x1024" }),
      });
      const data = await r.json();
      const url = data?.data?.[0]?.url || null;
      const b64 = data?.data?.[0]?.b64_json;
      const imageUrl = url || (b64 ? `data:image/png;base64,${b64}` : null);
      if (!imageUrl) return res.status(502).json({ error: "No image returned" });
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
        const err = await r.text();
        return res.status(500).json({ error: "TTS failed: " + err });
      }

      const arrayBuffer = await r.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const dataUrl = `data:audio/mpeg;base64,${base64}`;
      return res.json({ id: `podcast-${Date.now()}`, type: "podcast", url: dataUrl });
    }

    return res.status(400).json({ error: "Unsupported media type" });
  } catch (err: any) {
    logger.error({ err }, "media error");
    return res.status(500).json({ error: err?.message || "unknown error" });
  }
});

export default router;
