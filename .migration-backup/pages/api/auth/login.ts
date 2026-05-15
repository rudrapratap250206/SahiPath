import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { loginSchema, sanitizeInput } from '../../../lib/validate';
import { rateLimit } from '../../../lib/rateLimit';
import { sendError, sendOk } from '../../../lib/http';
import { getCorrelationId, attachCorrelationId } from '../../../lib/request';
import { info, error as logError } from '../../../lib/logger';
import { verifyPassword } from './utils';
const DATA_DIR = path.join(process.cwd(), 'data');

async function sqliteLogin(dbPath: string, email: string, password: string) {
  // require better-sqlite3 runtime
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const BetterSqlite3 = require('better-sqlite3');
  const db = new BetterSqlite3(dbPath);
  db.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE, passwordHash TEXT, profile TEXT, createdAt TEXT)').run();
  const row = db.prepare('SELECT id, email, passwordHash, profile FROM users WHERE email = ?').get(email);
  db.close();
  if (!row) return { error: 'Invalid credentials' };
  const ok = await verifyPassword(password, row.passwordHash);
  if (!ok) return { error: 'Invalid credentials' };
  return { user: { id: row.id, email: row.email, profile: row.profile ? JSON.parse(row.profile) : null } };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cid = getCorrelationId(req);
  attachCorrelationId(res, cid);
  if (req.method !== 'POST') return sendError(res, 405, 'Method not allowed');
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
  const rl = rateLimit(String(ip) + ':login', 10, 60_000);
  if (rl.limited) return sendError(res, 429, 'Too many requests');

  const input = sanitizeInput(req.body || {});
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return sendError(res, 400, parsed.error.errors.map(e=>e.message).join(', '));
  const { email, password } = parsed.data;
  info('login attempt', { cid, email, ip });

  try {
    // require sqlite and use it exclusively
    let BetterSqlite3: any = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      BetterSqlite3 = require('better-sqlite3');
    } catch (e) {
      return res.status(500).json({ error: 'better-sqlite3-not-installed', message: 'Run `npm install better-sqlite3` on the server' });
    }
    const dbPath = path.join(process.cwd(), 'data', 'app.db');
    const out = await sqliteLogin(dbPath, email, password);
    if ((out as any).error) return sendError(res, 401, (out as any).error);
    const { signToken, cookieSerialize } = require('../../../lib/auth');
    const token = await signToken({ id: out.user.id, email: out.user.email });
    res.setHeader('Set-Cookie', cookieSerialize('sahipath_token', token, { maxAge: 60 * 60 * 24 * 7 }));
    return sendOk(res, out);
  } catch (err: any) {
    logError('login error', { cid, message: err?.message || String(err) });
    return sendError(res, 500, err?.message || 'internal error');
  }
}
