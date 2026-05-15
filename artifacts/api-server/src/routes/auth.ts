import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  signToken,
  verifyToken,
  hashPassword,
  verifyPassword,
  parseCookieToken,
  serializeCookie,
} from "../lib/auth";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";

const router = Router();

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

router.post("/auth/register", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] ?? req.ip ?? "unknown");
  const { limited } = rateLimit(`${ip}:register`, 5, 60_000);
  if (limited) return res.status(429).json({ error: "Too many requests" });

  const body = req.body as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : null;
  const password = typeof body.password === "string" ? body.password : null;
  const profile = body.profile ?? null;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  try {
    const existing = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (existing.length > 0) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const passwordHash = await hashPassword(password);
    const [user] = await db
      .insert(usersTable)
      .values({ email, passwordHash, profile: profile ? JSON.stringify(profile) : null })
      .returning({ id: usersTable.id, email: usersTable.email });

    const token = await signToken({ id: user.id, email: user.email });
    res.setHeader("Set-Cookie", serializeCookie("sahipath_token", token, { maxAge: COOKIE_MAX_AGE }));
    logger.info({ userId: user.id }, "User registered");
    return res.json({ user: { id: user.id, email: user.email, profile: profile ?? null } });
  } catch (err: unknown) {
    logger.error({ err }, "Register error");
    return res.status(500).json({ error: "Internal error" });
  }
});

router.post("/auth/login", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] ?? req.ip ?? "unknown");
  const { limited } = rateLimit(`${ip}:login`, 10, 60_000);
  if (limited) return res.status(429).json({ error: "Too many requests" });

  const body = req.body as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : null;
  const password = typeof body.password === "string" ? body.password : null;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = await signToken({ id: user.id, email: user.email });
    res.setHeader("Set-Cookie", serializeCookie("sahipath_token", token, { maxAge: COOKIE_MAX_AGE }));
    const profile = user.profile ? (JSON.parse(user.profile) as unknown) : null;
    logger.info({ userId: user.id }, "User logged in");
    return res.json({ user: { id: user.id, email: user.email, profile } });
  } catch (err: unknown) {
    logger.error({ err }, "Login error");
    return res.status(500).json({ error: "Internal error" });
  }
});

router.post("/auth/logout", (_req, res) => {
  res.setHeader("Set-Cookie", serializeCookie("sahipath_token", "", { maxAge: 0 }));
  return res.json({ ok: true });
});

router.get("/auth/me", async (req, res) => {
  const token = parseCookieToken(req.headers.cookie);
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Invalid or expired token" });

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, payload.id))
      .limit(1);
    if (!user) return res.status(401).json({ error: "User not found" });
    const profile = user.profile ? (JSON.parse(user.profile) as unknown) : null;
    return res.json({ user: { id: user.id, email: user.email, profile } });
  } catch (err: unknown) {
    logger.error({ err }, "getMe error");
    return res.status(500).json({ error: "Internal error" });
  }
});

export default router;
