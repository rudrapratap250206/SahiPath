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
      const tests = await db
        .select()
        .from(testRecordsTable)
        .where(eq(testRecordsTable.userId, userId))
        .orderBy(desc(testRecordsTable.createdAt));
      return res.json({ tests });
    }
    return res.json({ tests: [] });
  } catch (err: unknown) {
    logger.error({ err }, "get tests error");
    return res.status(500).json({ error: "Internal error" });
  }
});

router.post("/tests", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] ?? req.ip ?? "unknown");
  const { limited } = rateLimit(`${ip}:tests`, 30, 60_000);
  if (limited) return res.status(429).json({ error: "Too many requests" });

  const body = req.body as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : null;
  const rawScore = body.score;
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";
  const date = typeof body.date === "string" ? body.date : new Date().toISOString();

  if (!name) return res.status(400).json({ error: "name is required" });

  const score = typeof rawScore === "number" ? rawScore : Number(rawScore);
  if (isNaN(score) || score < 0 || score > 100) {
    return res.status(400).json({ error: "score must be a number between 0 and 100" });
  }

  try {
    const token = parseCookieToken(req.headers.cookie);
    let userId: string | null = null;
    if (token) {
      const payload = await verifyToken(token);
      if (payload) userId = payload.id;
    }

    const [test] = await db
      .insert(testRecordsTable)
      .values({ userId: userId ?? "anonymous", name, score, date, notes })
      .returning();

    logger.info({ testId: test.id }, "test recorded");
    return res.json({ test });
  } catch (err: unknown) {
    logger.error({ err }, "record test error");
    return res.status(500).json({ error: "Internal error" });
  }
});

export default router;
