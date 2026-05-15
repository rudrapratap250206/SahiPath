import { Router } from "express";
import { db } from "@workspace/db";
import { testRecordsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { verifyToken, parseCookieToken } from "../lib/auth";
import { rateLimit } from "../lib/rateLimit";
import { logger } from "../lib/logger";

const router = Router();

router.get("/tests", async (req, res) => {
  try {
    const token = parseCookieToken(req.headers.cookie);
    let userId: string | null = null;
    if (token) {
      const payload = await verifyToken(token);
      if (payload) userId = payload.id;
    }

    if (userId) {
      const tests = await db.select().from(testRecordsTable).where(eq(testRecordsTable.userId, userId)).orderBy(desc(testRecordsTable.createdAt));
      return res.json({ tests });
    }
    return res.json({ tests: [] });
  } catch (err: any) {
    logger.error({ err }, "get tests error");
    return res.status(500).json({ error: "Internal error" });
  }
});

router.post("/tests", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] || req.ip || "ip");
  const rl = rateLimit(`${ip}:tests`, 30, 60_000);
  if (rl.limited) return res.status(429).json({ error: "Too many requests" });

  const { name, score, date, notes } = req.body || {};
  if (!name || score === undefined) return res.status(400).json({ error: "name and score required" });
  if (typeof score !== "number" || score < 0 || score > 100) return res.status(400).json({ error: "score must be 0-100" });

  try {
    const token = parseCookieToken(req.headers.cookie);
    let userId: string | null = null;
    if (token) {
      const payload = await verifyToken(token);
      if (payload) userId = payload.id;
    }

    const [test] = await db.insert(testRecordsTable).values({
      userId: userId || "anonymous",
      name: String(name),
      score: Number(score),
      date: date || new Date().toISOString(),
      notes: notes || "",
    }).returning();

    logger.info({ testId: test.id }, "test recorded");
    return res.json({ test });
  } catch (err: any) {
    logger.error({ err }, "record test error");
    return res.status(500).json({ error: "Internal error" });
  }
});

export default router;
