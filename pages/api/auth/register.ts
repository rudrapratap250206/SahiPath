import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { registerSchema, sanitizeInput } from '../../../lib/validate';
import { rateLimit } from '../../../lib/rateLimit';
import { sendError, sendOk } from '../../../lib/http';
import { hashPassword } from './utils';
import { getCorrelationId, attachCorrelationId } from '../../../lib/request';
import { info, error as logError } from '../../../lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cid = getCorrelationId(req);
  attachCorrelationId(res, cid);
  if (req.method !== 'POST') return sendError(res, 405, 'Method not allowed');
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
  const rl = rateLimit(String(ip) + ':register', 5, 60_000);
  if (rl.limited) return sendError(res, 429, 'Too many requests');

  const input = sanitizeInput(req.body || {});
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) return sendError(res, 400, parsed.error.errors.map(e=>e.message).join(', '));
  const { email, password, profile } = parsed.data;
  info('register request', { cid, email, ip });

  try {
    // require better-sqlite3 at runtime and use SQLite as the single source of truth
    let BetterSqlite3: any = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      BetterSqlite3 = require('better-sqlite3');
    } catch (e) {
      return res.status(500).json({ error: 'better-sqlite3-not-installed', message: 'Run `npm install better-sqlite3` on the server' });
    }

    const dbPath = path.join(process.cwd(), 'data', 'app.db');
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    const db = new BetterSqlite3(dbPath);
    db.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE, passwordHash TEXT, profile TEXT, createdAt TEXT)').run();

    const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (exists) {
      db.close();
      return sendError(res, 409, 'User already exists');
    }

    // store hashed password using existing runtime hashing strategy
    const { hashPassword } = require('./utils');
    const hash = await hashPassword(password);
    const id = `${Date.now()}`;
    db.prepare('INSERT INTO users (id, email, passwordHash, profile, createdAt) VALUES (?, ?, ?, ?, ?)').run(id, email, hash, JSON.stringify(profile || null), new Date().toISOString());
    db.close();

    const { signToken, cookieSerialize } = require('../../../lib/auth');
    const token = await signToken({ id, email });
    res.setHeader('Set-Cookie', cookieSerialize('sahipath_token', token, { maxAge: 60 * 60 * 24 * 7 }));
    return sendOk(res, { user: { id, email, profile } });
  } catch (err: any) {
    logError('register error', { cid, message: err?.message || String(err) });
    return sendError(res, 500, err?.message || 'internal error');
  }
}
