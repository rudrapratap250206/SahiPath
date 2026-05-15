import type { NextApiRequest, NextApiResponse } from 'next';
import { cookieSerialize } from '../../../lib/auth';
import { rateLimit } from '../../../lib/rateLimit';
import { sendOk } from '../../../lib/http';
import { getCorrelationId, attachCorrelationId } from '../../../lib/request';
import { info } from '../../../lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cid = getCorrelationId(req);
  attachCorrelationId(res, cid);
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
  const rl = rateLimit(String(ip) + ':logout', 20, 60_000);
  if (rl.limited) return res.status(429).json({ error: 'Too many requests' });

  // clear cookie (uses secure defaults in cookieSerialize)
  res.setHeader('Set-Cookie', cookieSerialize('sahipath_token', '', { maxAge: 0 }));
  info('logout', { cid, ip });
  return sendOk(res, { ok: true });
}
