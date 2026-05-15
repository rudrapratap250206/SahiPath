import crypto from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(crypto.scrypt as any);

export async function hashPassword(password: string): Promise<string> {
  try {
    // prefer bcryptjs if available
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  } catch (err) {
    const salt = crypto.randomBytes(16).toString('hex');
    const derived = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${derived.toString('hex')}`;
  }
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bcrypt = require('bcryptjs');
    return bcrypt.compareSync(password, hashed);
  } catch (err) {
    const [salt, derivedHex] = (hashed || '').split(':');
    if (!salt || !derivedHex) return false;
    const derived = (await scryptAsync(password, salt, 64)) as Buffer;
    return derived.toString('hex') === derivedHex;
  }
}
