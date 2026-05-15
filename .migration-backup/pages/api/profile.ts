import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { profileSchema, sanitizeInput } from '../../lib/validate';
import { getCorrelationId, attachCorrelationId } from '../../lib/request';
import { info, error as logError } from '../../lib/logger';
import { rateLimit } from '../../lib/rateLimit';
import { sendError, sendOk } from '../../lib/http';
import { verifyToken } from '../../lib/auth';

const DB_PATH = path.join(process.cwd(), 'data', 'app.db');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cid = getCorrelationId(req);
  attachCorrelationId(res, cid);
  info('profile api request', { cid, method: req.method, ip: req.socket.remoteAddress });

  try {
    // require authentication for profile operations
    const cookie = req.headers.cookie || '';
    const match = cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith('sahipath_token='));
    if (!match) return sendError(res, 401, 'Not authenticated');
    const token = match.split('=')[1];
    const payload = await verifyToken(token);
    if (!payload) return sendError(res, 401, 'Invalid token');
    const userId = String((payload as any).id);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const BetterSqlite3 = require('better-sqlite3');
    const db = new BetterSqlite3(DB_PATH);

    if (req.method === 'GET') {
      const row = db.prepare('SELECT profile FROM users WHERE id = ?').get(userId);
      db.close();
      if (!row) return sendError(res, 404, 'User not found');
      info('profile fetched', { cid, userId });
      return sendOk(res, { profile: row.profile ? JSON.parse(row.profile) : null });
    }

    if (req.method === 'POST') {
      const rl = rateLimit(String(req.socket.remoteAddress || 'ip') + ':profile', 10, 60_000);
      if (rl.limited) return sendError(res, 429, 'Too many requests');

      const input = sanitizeInput(req.body || {});
      const parsed = profileSchema.safeParse(input);
      if (!parsed.success) return sendError(res, 400, parsed.error.errors.map((e:any)=>e.message).join(', '));
      const profile = parsed.data;

      db.prepare('UPDATE users SET profile = ? WHERE id = ?').run(JSON.stringify(profile), userId);
      db.close();
      info('profile updated', { cid, userId });
      return sendOk(res, { profile });
    }

    return sendError(res, 405, 'Method not allowed');
  } catch (err: any) {
    logError('profile api error', { cid, message: err?.message || String(err) });
    return sendError(res, 500, 'internal error');
  }
}
