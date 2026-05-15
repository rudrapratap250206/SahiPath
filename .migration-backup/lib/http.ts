import type { NextApiResponse } from 'next';

export function sendError(res: NextApiResponse, status: number, message: string) {
  return res.status(status).json({ error: message });
}

export function sendOk(res: NextApiResponse, payload: any) {
  return res.status(200).json(payload);
}
