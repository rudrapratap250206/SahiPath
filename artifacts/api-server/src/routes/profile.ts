import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { verifyToken, parseCookieToken } from "../lib/auth";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";

const router = Router();

async function requireAuth(req: any, res: any): Promise<{ id: string; email: string } | null> {
  const token = parseCookieToken(req.headers.cookie);
  if (!token) { res.status(401).json({ error: "Not authenticated" }); return null; }
  const payload = await verifyToken(token);
  if (!payload) { res.status(401).json({ error: "Invalid token" }); return null; }
  return payload;
}

router.get("/profile", async (req, res) => {
  const user = await requireAuth(req, res);
  if (!user) return;

  try {
    const [row] = await db.select().from(usersTable).where(eq(usersTable.id, user.id)).limit(1);
    if (!row) return res.status(404).json({ error: "User not found" });
    return res.json({ profile: row.profile ? JSON.parse(row.profile) : null });
  } catch (err: any) {
    logger.error({ err }, "get profile error");
    return res.status(500).json({ error: "Internal error" });
  }
});

router.post("/profile", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] || req.ip || "ip");
  const rl = rateLimit(`${ip}:profile`, 10, 60_000);
  if (rl.limited) return res.status(429).json({ error: "Too many requests" });

  const user = await requireAuth(req, res);
  if (!user) return;

  const profile = req.body;
  if (!profile || typeof profile !== "object") return res.status(400).json({ error: "Profile data required" });

  try {
    await db.update(usersTable).set({ profile: JSON.stringify(profile) }).where(eq(usersTable.id, user.id));
    logger.info({ userId: user.id }, "profile updated");
    return res.json({ profile });
  } catch (err: any) {
    logger.error({ err }, "save profile error");
    return res.status(500).json({ error: "Internal error" });
  }
});

export default router;
