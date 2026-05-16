import { Router } from "express";
import { db, pool } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { hashPassword } from "../lib/auth";
import { logger } from "../lib/logger";
import nodemailer from "nodemailer";

const router = Router();

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getTransporter() {
  const user = process.env["SMTP_EMAIL"];
  const pass = process.env["SMTP_APP_PASSWORD"];
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

router.post("/auth/forgot-password", async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : null;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const [user] = await db.select({ id: usersTable.id, email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user) {
      return res.json({ ok: true, message: "If that email is registered, you will receive a reset code." });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const id = crypto.randomUUID();

    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO password_reset_tokens (id, user_id, token, expires_at) VALUES ($1, $2, $3, $4)`,
        [id, user.id, otp, expiresAt]
      );
    } finally {
      client.release();
    }

    const transporter = getTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: `"SahiPath" <${process.env["SMTP_EMAIL"]}>`,
        to: email,
        subject: "SahiPath Password Reset Code",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:auto">
            <h2 style="color:#4f8ef7">🔐 Reset Your SahiPath Password</h2>
            <p>You requested a password reset. Use the code below — it expires in 15 minutes.</p>
            <div style="font-size:2.5rem;font-weight:bold;letter-spacing:0.3rem;text-align:center;padding:1.5rem;background:#f0f4ff;border-radius:8px;color:#1a1a2e">
              ${otp}
            </div>
            <p style="color:#666;font-size:0.9rem;margin-top:1.5rem">If you didn't request this, ignore this email — your account is safe.</p>
          </div>
        `,
      });
      logger.info({ userId: user.id }, "Password reset email sent");
    } else {
      logger.warn("SMTP not configured — OTP generated but not sent");
    }

    return res.json({ ok: true, message: "If that email is registered, you will receive a reset code." });
  } catch (err) {
    logger.error({ err }, "forgot-password error");
    return res.status(500).json({ error: "Internal error" });
  }
});

router.post("/auth/reset-password", async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : null;
  const otp = typeof body.otp === "string" ? body.otp.trim() : null;
  const newPassword = typeof body.newPassword === "string" ? body.newPassword : null;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ error: "email, otp, and newPassword are required" });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  try {
    const [user] = await db.select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset code" });
    }

    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        `SELECT id FROM password_reset_tokens
         WHERE user_id = $1 AND token = $2 AND used = FALSE AND expires_at > NOW()
         LIMIT 1`,
        [user.id, otp]
      );

      if (rows.length === 0) {
        return res.status(400).json({ error: "Invalid or expired reset code" });
      }

      const tokenId = rows[0].id;
      await client.query(`UPDATE password_reset_tokens SET used = TRUE WHERE id = $1`, [tokenId]);

      const passwordHash = await hashPassword(newPassword);
      await db.update(usersTable).set({ passwordHash }).where(eq(usersTable.id, user.id));

      logger.info({ userId: user.id }, "Password reset successfully");
      return res.json({ ok: true });
    } finally {
      client.release();
    }
  } catch (err) {
    logger.error({ err }, "reset-password error");
    return res.status(500).json({ error: "Internal error" });
  }
});

export default router;
