import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { signToken, verifyToken, hashPassword, verifyPassword, parseCookieToken, serializeCookie } from "../lib/auth";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";

const router = Router();

router.post("/auth/register", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] || req.ip || "ip");
  const rl = rateLimit(`${ip}:register`, 5, 60_000);
  if (rl.limited) return res.status(429).json({ error: "Too many requests" });

  const { email, password, profile } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });
  if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });

  try {
    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (existing.length > 0) return res.status(409).json({ error: "User already exists" });

    const passwordHash = await hashPassword(password);
    const [user] = await db.insert(usersTable).values({
      email,
      passwordHash,
      profile: profile ? JSON.stringify(profile) : null,
    }).returning();

    const token = await signToken({ id: user.id, email: user.email });
    res.setHeader("Set-Cookie", serializeCookie("sahipath_token", token, { maxAge: 60 * 60 * 24 * 7 }));
    logger.info({ userId: user.id }, "User registered");
    return res.json({ user: { id: user.id, email: user.email, profile: profile || null } });
  } catch (err: any) {
    logger.error({ err }, "Register error");
    return res.status(500).json({ error: "Internal error" });
  }
});

router.post("/auth/login", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] || req.ip || "ip");
  const rl = rateLimit(`${ip}:login`, 10, 60_000);
  if (rl.limited) return res.status(429).json({ error: "Too many requests" });

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = await signToken({ id: user.id, email: user.email });
    res.setHeader("Set-Cookie", serializeCookie("sahipath_token", token, { maxAge: 60 * 60 * 24 * 7 }));
    const profile = user.profile ? JSON.parse(user.profile) : null;
    logger.info({ userId: user.id }, "User logged in");
    return res.json({ user: { id: user.id, email: user.email, profile } });
  } catch (err: any) {
    logger.error({ err }, "Login error");
    return res.status(500).json({ error: "Internal error" });
  }
});

router.post("/auth/logout", async (req, res) => {
  res.setHeader("Set-Cookie", serializeCookie("sahipath_token", "", { maxAge: 0 }));
  return res.json({ ok: true });
});

router.get("/auth/me", async (req, res) => {
  const token = parseCookieToken(req.headers.cookie);
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Invalid token" });

  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, payload.id)).limit(1);
    if (!user) return res.status(401).json({ error: "User not found" });
    const profile = user.profile ? JSON.parse(user.profile) : null;
    return res.json({ user: { id: user.id, email: user.email, profile } });
  } catch (err: any) {
    logger.error({ err }, "getMe error");
    return res.status(500).json({ error: "Internal error" });
  }
});

export default router;
