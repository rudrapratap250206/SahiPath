import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../lib/auth';
import { sendError, sendOk } from '../../../lib/http';
import path from 'path';
import { getCorrelationId, attachCorrelationId } from '../../../lib/request';
import { info, error as logError } from '../../../lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.headers.cookie || '';
  const match = cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith('sahipath_token='));
  if (!match) return res.status(401).json({ error: 'Not authenticated' });
  const token = match.split('=')[1];
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Invalid token' });

  const cid = getCorrelationId(req);
  attachCorrelationId(res, cid);
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const BetterSqlite3 = require('better-sqlite3');
    const dbPath = path.join(process.cwd(), 'data', 'app.db');
    const db = new BetterSqlite3(dbPath);
    const row = db.prepare('SELECT profile FROM users WHERE id = ?').get(String((payload as any).id));
    db.close();
    if (!row) {
      logError('me lookup: user not found', { cid, id: (payload as any).id });
      return sendError(res, 404, 'User not found');
    }
    info('me lookup', { cid, id: (payload as any).id });
    return sendOk(res, { profile: row.profile ? JSON.parse(row.profile) : null });
  } catch (e:any) {
    logError('me lookup error', { cid, message: e?.message || String(e) });
    return sendError(res, 500, 'User lookup failed');
  }
}
