import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { promises as pfs } from 'fs';

const SECRET_PATH = path.join(process.cwd(), 'data', 'jwt_secret.key');

async function getOrCreateSecret() {
  try {
    await pfs.mkdir(path.dirname(SECRET_PATH), { recursive: true });
    const exists = fs.existsSync(SECRET_PATH);
    if (!exists) {
      const val = jwt.sign({ i: 1 }, 'init', { expiresIn: '1h' }); // dummy to create randomness
      await pfs.writeFile(SECRET_PATH, Buffer.from(val).toString('hex'));
    }
    const raw = await pfs.readFile(SECRET_PATH, 'utf8');
    return raw || 'dev-secret';
  } catch (e) {
    return process.env.JWT_SECRET || 'dev-secret';
  }
}

export async function signToken(payload: object, opts?: jwt.SignOptions) {
  const secret = process.env.JWT_SECRET || (await getOrCreateSecret());
  return jwt.sign(payload as any, secret, { expiresIn: '7d', ...(opts || {}) });
}

export async function verifyToken(token: string) {
  if (!token) return null;
  const secret = process.env.JWT_SECRET || (await getOrCreateSecret());
  try {
    return jwt.verify(token, secret) as any;
  } catch (e) {
    return null;
  }
}

export function cookieSerialize(name: string, value: string, opts: any = {}) {
  const cookie = require('cookie');
  const defaults = {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };
  const out = Object.assign({}, defaults, opts || {});
  return cookie.serialize(name, value, out);
}
