import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { testRecordSchema, sanitizeInput } from '../../lib/validate';
import { getCorrelationId, attachCorrelationId } from '../../lib/request';
import { info, error as logError } from '../../lib/logger';
import { rateLimit } from '../../lib/rateLimit';
import { sendError, sendOk } from '../../lib/http';

const DATA_DIR = path.join(process.cwd(), 'data');
const TESTS_PATH = path.join(DATA_DIR, 'tests.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cid = getCorrelationId(req);
  attachCorrelationId(res, cid);
  info('tests api request', { cid, method: req.method });

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    if (req.method === 'GET') {
      try {
        const content = await fs.readFile(TESTS_PATH, 'utf8');
        return sendOk(res, { tests: JSON.parse(content) });
      } catch (err) {
        return sendOk(res, { tests: [] });
      }
    }

    if (req.method === 'POST') {
      const rl = rateLimit(String(req.socket.remoteAddress || 'ip') + ':tests', 30, 60_000);
      if (rl.limited) return sendError(res, 429, 'Too many requests');
      // attach user id if authenticated (optional)
      const cookie = req.headers.cookie || '';
      const match = cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith('sahipath_token='));
      let userId: string | null = null;
      if (match) {
        const token = match.split('=')[1];
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { verifyToken } = require('../../lib/auth');
        try {
          const payload = await verifyToken(token);
          if (payload) userId = String((payload as any).id);
        } catch (_) { userId = null; }
      }

      const input = sanitizeInput(req.body || {});
      const parsed = testRecordSchema.safeParse(input);
      if (!parsed.success) return sendError(res, 400, parsed.error.errors.map((e:any)=>e.message).join(', '));
      const test = parsed.data;
      if (userId) (test as any).userId = userId;
      let current = [];
      try {
        const content = await fs.readFile(TESTS_PATH, 'utf8');
        current = JSON.parse(content);
      } catch (err) {
        current = [];
      }
      current.push(test);
      await fs.writeFile(TESTS_PATH, JSON.stringify(current, null, 2), 'utf8');
      info('test recorded', { cid, ip: req.socket.remoteAddress });
      return sendOk(res, { test, all: current });
    }

    return sendError(res, 405, 'Method not allowed');
  } catch (err: any) {
    logError('tests api error', { cid, message: err?.message || String(err) });
    return sendError(res, 500, 'internal error');
  }
}
