import type { NextApiRequest, NextApiResponse } from 'next';
import { mediaSchema, sanitizeInput } from '../../lib/validate';
import { getCorrelationId, attachCorrelationId } from '../../lib/request';
import { info, error as logError } from '../../lib/logger';
import { rateLimit } from '../../lib/rateLimit';
import { sendError, sendOk } from '../../lib/http';
import { verifyToken } from '../../lib/auth';

// Media proxy endpoint with hardening: validation, sanitization, auth, rate limiting, tracing
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cid = getCorrelationId(req);
  attachCorrelationId(res, cid);
  if (req.method !== 'POST') return sendError(res, 405, 'Method not allowed');

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
  const rl = rateLimit(String(ip) + ':media', 10, 60_000);
  if (rl.limited) return sendError(res, 429, 'Too many requests');

  const input = sanitizeInput(req.body || {});
  const parsed = mediaSchema.safeParse(input);
  if (!parsed.success) return sendError(res, 400, parsed.error.errors.map((e:any)=>e.message).join(', '));

  // require authentication to prevent abuse of the media generation
  try {
    const cookie = req.headers.cookie || '';
    const match = cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith('sahipath_token='));
    if (!match) return sendError(res, 401, 'Not authenticated');
    const token = match.split('=')[1];
    const payload = await verifyToken(token);
    if (!payload) return sendError(res, 401, 'Invalid token');

    const { type, prompt } = parsed.data;
    info('media request', { cid, type, user: (payload as any).id, ip });

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return sendError(res, 503, 'Media generation is not configured');
    }

    if (type === 'image') {
      const r = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({ prompt, n: 1, size: '1024x1024' }),
      });
      const data = await r.json();
      const url = data?.data?.[0]?.url || null;
      const b64 = data?.data?.[0]?.b64_json;
      const imageUrl = url || (b64 ? `data:image/png;base64,${b64}` : null);
      if (!imageUrl) return sendError(res, 502, 'Media provider returned no image');
      return sendOk(res, { id: `image-${Date.now()}`, type: 'image', prompt, url: imageUrl, raw: data });
    }

    if (type === 'podcast') {
      const ttsEndpoint = 'https://api.openai.com/v1/audio/speech';
      const body = { model: 'gpt-4o-mini-tts', voice: 'alloy', input: prompt };
      const r = await fetch(ttsEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify(body),
      });

      if (!r.ok) {
        const err = await r.text();
        return sendError(res, 500, 'TTS failed: ' + err);
      }

      const arrayBuffer = await r.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const dataUrl = `data:audio/mpeg;base64,${base64}`;
      return sendOk(res, { id: `podcast-${Date.now()}`, type: 'podcast', prompt, url: dataUrl });
    }

    return sendError(res, 400, 'Unsupported media type');
  } catch (err: any) {
    logError('media error', { cid, message: err?.message || String(err) });
    return sendError(res, 500, err?.message || 'unknown error');
  }
}
