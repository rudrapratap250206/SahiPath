import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt as any);

const JWT_SECRET = process.env.JWT_SECRET || "sahipath-dev-secret-change-in-prod";

function base64urlEncode(str: string): string {
  return Buffer.from(str).toString("base64url");
}

function base64urlDecode(str: string): string {
  return Buffer.from(str, "base64url").toString("utf8");
}

export async function signToken(payload: object): Promise<string> {
  const header = base64urlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64urlEncode(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 }));
  const sig = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${sig}`;
}

export async function verifyToken(token: string): Promise<any> {
  if (!token) return null;
  try {
    const [header, body, sig] = token.split(".");
    if (!header || !body || !sig) return null;
    const expected = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
    if (expected !== sig) return null;
    const payload = JSON.parse(base64urlDecode(body));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  try {
    const [salt, derivedHex] = (hashed || "").split(":");
    if (!salt || !derivedHex) return false;
    const derived = (await scryptAsync(password, salt, 64)) as Buffer;
    return crypto.timingSafeEqual(Buffer.from(derived.toString("hex")), Buffer.from(derivedHex));
  } catch {
    return false;
  }
}

export function parseCookieToken(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.split(";").map(c => c.trim()).find(c => c.startsWith("sahipath_token="));
  if (!match) return null;
  return match.split("=").slice(1).join("=");
}

export function serializeCookie(name: string, value: string, opts: { maxAge?: number } = {}): string {
  const parts = [`${name}=${value}`];
  parts.push("HttpOnly");
  parts.push("Path=/");
  parts.push("SameSite=Lax");
  if (opts.maxAge !== undefined) parts.push(`Max-Age=${opts.maxAge}`);
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}
