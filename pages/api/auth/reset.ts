import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { sanitizeInput } from '../../../lib/validate';
import { rateLimit } from '../../../lib/rateLimit';
import { hashPassword } from './utils';
import { z } from 'zod';
import { sendError, sendOk } from '../../../lib/http';
import { getCorrelationId, attachCorrelationId } from '../../../lib/request';
import { info, error as logError } from '../../../lib/logger';

const resetSchema = z.object({ token: z.string().min(1), password: z.string().min(6).max(128) });

const TOKENS_PATH = path.join(process.cwd(), 'data', 'reset_tokens.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cid = getCorrelationId(req);
  attachCorrelationId(res, cid);
  if (req.method !== 'POST') return sendError(res, 405, 'Method not allowed');
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
  const rl = rateLimit(String(ip) + ':reset', 5, 60_000);
  if (rl.limited) return sendError(res, 429, 'Too many requests');

  const input = sanitizeInput(req.body || {});
  const parsed = resetSchema.safeParse(input);
  if (!parsed.success) return sendError(res, 400, parsed.error.errors.map((e)=>e.message).join(', '));
  const { token, password } = parsed.data;

  try {
    let tokens: any[] = [];
    try { tokens = JSON.parse(await fs.readFile(TOKENS_PATH, 'utf8')); } catch (e) { tokens = []; }
    const record = tokens.find((t) => t.token === token && !t.used && t.expiresAt > Date.now());
    if (!record) return sendError(res, 400, 'Invalid or expired token');

    // update user in sqlite
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const BetterSqlite3 = require('better-sqlite3');
    const dbPath = path.join(process.cwd(), 'data', 'app.db');
    const db = new BetterSqlite3(dbPath);
    const row = db.prepare('SELECT id FROM users WHERE email = ?').get(record.email);
    if (!row) {
      db.close();
      return sendError(res, 404, 'User not found');
    }

    const hashed = await hashPassword(password);
    db.prepare('UPDATE users SET passwordHash = ? WHERE id = ?').run(hashed, String(row.id));
    db.close();

    // Mark token used
    record.used = true;
    await fs.writeFile(TOKENS_PATH, JSON.stringify(tokens, null, 2), 'utf8');
    info('password reset applied', { cid, email: record.email, ip });

    return sendOk(res, { ok: true });
  } catch (err: any) {
    logError('reset error', { cid, message: err?.message || String(err) });
    return sendError(res, 500, 'internal');
  }
}
