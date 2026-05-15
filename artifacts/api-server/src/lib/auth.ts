import crypto from "crypto";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET environment variable is required but was not provided. " +
      "Add it to your Replit Secrets before starting the server."
    );
  }
  return secret;
}

// crypto.scrypt has overloads; use the callback form wrapped in a typed promise
function scryptAsync(
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    crypto.scrypt(password, salt, keylen, (err, derived) => {
      if (err) reject(err);
      else resolve(derived);
    })
  );
}

interface TokenPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

function base64urlEncode(str: string): string {
  return Buffer.from(str).toString("base64url");
}

function base64urlDecode(str: string): string {
  return Buffer.from(str, "base64url").toString("utf8");
}

export async function signToken(payload: { id: string; email: string }): Promise<string> {
  const header = base64urlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64urlEncode(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }),
  );
  const sig = crypto
    .createHmac("sha256", getJwtSecret())
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${sig}`;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts as [string, string, string];
    const expected = crypto
      .createHmac("sha256", getJwtSecret())
      .update(`${header}.${body}`)
      .digest("base64url");
    if (expected !== sig) return null;
    const payload = JSON.parse(base64urlDecode(body)) as TokenPayload;
    if (!payload.id || !payload.email) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = await scryptAsync(password, salt, 64);
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  try {
    const colonIdx = hashed.indexOf(":");
    if (colonIdx === -1) return false;
    const salt = hashed.slice(0, colonIdx);
    const derivedHex = hashed.slice(colonIdx + 1);
    if (!salt || !derivedHex) return false;
    const derived = await scryptAsync(password, salt, 64);
    const derivedBuf = Buffer.from(derived.toString("hex"), "hex");
    const storedBuf = Buffer.from(derivedHex, "hex");
    if (derivedBuf.length !== storedBuf.length) return false;
    return crypto.timingSafeEqual(derivedBuf, storedBuf);
  } catch {
    return false;
  }
}

export function parseCookieToken(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (trimmed.startsWith("sahipath_token=")) {
      return trimmed.slice("sahipath_token=".length) || null;
    }
  }
  return null;
}

export function parseRequestToken(headers: {
  cookie?: string;
  authorization?: string;
}): string | null {
  const authHeader = headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    if (token) return token;
  }
  return parseCookieToken(headers.cookie);
}

export function serializeCookie(
  name: string,
  value: string,
  opts: { maxAge?: number } = {},
): string {
  const parts = [`${name}=${value}`, "HttpOnly", "Path=/", "SameSite=Lax"];
  if (opts.maxAge !== undefined) parts.push(`Max-Age=${opts.maxAge}`);
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}
