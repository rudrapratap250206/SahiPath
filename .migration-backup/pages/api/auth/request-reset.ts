import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { sanitizeInput } from '../../../lib/validate';
import { rateLimit } from '../../../lib/rateLimit';
import { getCorrelationId, attachCorrelationId } from '../../../lib/request';
import { info, error as logError } from '../../../lib/logger';
import { sendError, sendOk } from '../../../lib/http';

const TOKENS_PATH = path.join(process.cwd(), 'data', 'reset_tokens.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cid = getCorrelationId(req);
  attachCorrelationId(res, cid);
  if (req.method !== 'POST') return sendError(res, 405, 'Method not allowed');
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
  const rl = rateLimit(String(ip) + ':request-reset', 5, 60_000);
  if (rl.limited) return sendError(res, 429, 'Too many requests');

  const input = sanitizeInput(req.body || {});
  const email = input.email;
  if (!email) return sendError(res, 400, 'Missing email');

  try {
    await fs.mkdir(path.dirname(TOKENS_PATH), { recursive: true });
    let tokens: any[] = [];
    try { tokens = JSON.parse(await fs.readFile(TOKENS_PATH, 'utf8')); } catch (e) { tokens = []; }

    const token = crypto.randomBytes(24).toString('hex');
    const expiresAt = Date.now() + 1000 * 60 * 60; // 1 hour
    tokens.push({ token, email, expiresAt, used: false });
    await fs.writeFile(TOKENS_PATH, JSON.stringify(tokens, null, 2), 'utf8');
    info('request-reset created token', { cid, email, ip });

    // In production, send email. For dev, return token in response (safe for local testing).
    return sendOk(res, { ok: true, note: 'DEV: reset token returned for testing', token });
  } catch (err: any) {
    logError('request-reset error', { cid, message: err?.message || String(err) });
    return sendError(res, 500, 'internal');
  }
}
