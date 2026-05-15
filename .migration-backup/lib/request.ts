import type { NextApiRequest, NextApiResponse } from 'next';

export function getCorrelationId(req: NextApiRequest) {
  const header = req.headers['x-correlation-id'] as string | undefined;
  try {
    // prefer incoming header
    if (header && header.trim()) return header;
    // fallback to crypto random UUID
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto');
    return crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
  } catch (e) {
    return String(Date.now());
  }
}

export function attachCorrelationId(res: NextApiResponse, id: string) {
  try {
    res.setHeader('X-Correlation-ID', id);
  } catch (e) {
    // ignore
  }
}
