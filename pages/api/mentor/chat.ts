import type { NextApiRequest, NextApiResponse } from 'next';
import { mentorChatSchema, sanitizeInput } from '../../../lib/validate';
import { getCorrelationId, attachCorrelationId } from '../../../lib/request';
import { info, error as logError } from '../../../lib/logger';
import { rateLimit } from '../../../lib/rateLimit';
import { sendError, sendOk } from '../../../lib/http';

function buildProfileContext(profile: Record<string, any> | undefined) {
  if (!profile) return 'No profile provided.';
  return JSON.stringify(profile, null, 2);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cid = getCorrelationId(req);
  attachCorrelationId(res, cid);

  if (req.method !== 'POST') return sendError(res, 405, 'Method not allowed');

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
  const rl = rateLimit(String(ip) + ':mentor-chat', 20, 60_000);
  if (rl.limited) return sendError(res, 429, 'Too many requests');

  const input = sanitizeInput(req.body || {});
  const parsed = mentorChatSchema.safeParse(input);
  if (!parsed.success) {
    return sendError(res, 400, parsed.error.errors.map((e:any)=>e.message).join(', '));
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return sendError(res, 503, 'GEMINI_API_KEY is not configured');

  const { message, profile, mode } = parsed.data;
  const systemPrompt = [
    'You are SahiPath, a focused career mentor.',
    'Respond with concise, practical guidance.',
    'Do not mention that you are a language model.',
    'If the user asks for step-by-step help, provide actionable steps.',
    'Keep the reply text-only and do not include markdown code fences unless needed.',
  ].join(' ');

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `${systemPrompt}\n\nMode: ${mode}\n\nProfile context:\n${buildProfileContext(profile)}\n\nUser message:\n${message}`,
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      logError('mentor chat upstream error', { cid, status: response.status, detail });
      return sendError(res, 502, 'Gemini request failed');
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part: any) => part?.text || '')
      .join('')
      .trim();

    if (!reply) {
      logError('mentor chat empty reply', { cid });
      return sendError(res, 502, 'Gemini returned no reply');
    }

    info('mentor chat reply', { cid, ip, mode });
    return sendOk(res, { reply });
  } catch (err: any) {
    logError('mentor chat error', { cid, message: err?.message || String(err) });
    return sendError(res, 500, 'Unable to generate reply');
  }
}