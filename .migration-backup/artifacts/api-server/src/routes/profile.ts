import { Router, Request, Response } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { verifyToken, parseRequestToken } from "../lib/auth";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";

const router = Router();

async function requireAuth(
  req: Request,
  res: Response,
): Promise<{ id: string; email: string } | null> {
  const token = parseRequestToken(req.headers as { cookie?: string; authorization?: string });
  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return null;
  }
  const payload = await verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: "Invalid or expired token" });
    return null;
  }
  return payload;
}

router.get("/profile", async (req, res) => {
  const user = await requireAuth(req, res);
  if (!user) return;

  try {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, user.id))
      .limit(1);
    if (!row) return res.status(404).json({ error: "User not found" });
    const profile = row.profile ? (JSON.parse(row.profile) as unknown) : null;
    return res.json({ profile });
  } catch (err: unknown) {
    logger.error({ err }, "get profile error");
    return res.status(500).json({ error: "Internal error" });
  }
});

router.post("/profile", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] ?? req.ip ?? "unknown");
  const { limited } = rateLimit(`${ip}:profile`, 20, 60_000);
  if (limited) return res.status(429).json({ error: "Too many requests" });

  const user = await requireAuth(req, res);
  if (!user) return;

  const profile = req.body as Record<string, unknown>;

  try {
    await db
      .update(usersTable)
      .set({ profile: JSON.stringify(profile) })
      .where(eq(usersTable.id, user.id));
    logger.info({ userId: user.id }, "Profile saved");
    return res.json({ profile });
  } catch (err: unknown) {
    logger.error({ err }, "save profile error");
    return res.status(500).json({ error: "Internal error" });
  }
});

export default router;
