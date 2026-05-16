import { Router } from "express";
import { logger } from "../lib/logger";
import { parseRequestToken, verifyToken } from "../lib/auth";
import { ai } from "@workspace/integrations-gemini-ai";

const router = Router();

router.post("/studyplan/generate", async (req, res) => {
  const token = parseRequestToken(req);
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return res.status(401).json({ error: "Unauthorized" });

  const { weakTopics = [], availableHoursPerWeek = 10, goals = "", skills = [], currentRole = "", preferredLearningStyle = "" } = req.body;

  const weakStr = weakTopics.length > 0 ? weakTopics.map((t: any) => `${t.topic} (avg: ${t.avg}%)`).join(", ") : "None identified yet";
  const skillsStr = Array.isArray(skills) && skills.length > 0 ? skills.join(", ") : "General";

  const prompt = `You are an expert career coach and study planner. Generate a personalized 7-day weekly study schedule for the following student/professional.

Student Profile:
- Current Role: ${currentRole || "Aspiring professional"}
- Skills: ${skillsStr}
- Career Goals: ${goals || "Advance career and improve technical skills"}
- Available Study Hours Per Week: ${availableHoursPerWeek} hours
- Preferred Learning Style: ${preferredLearningStyle || "Mixed"}
- Weak Topics (from test scores): ${weakStr}

Requirements:
1. Spread ${availableHoursPerWeek} hours across 7 days. Vary the daily load (some days lighter, some heavier). Rest day(s) allowed.
2. Prioritize weak topics — they should appear MORE frequently and get more time.
3. Each day can have 1–3 study sessions covering different topics/activities.
4. Session types: "study" (reading/learning), "practice" (coding/exercises), "review" (revision), "project" (hands-on build), "rest" (no study).
5. Include a brief motivational tip for each day.
6. Make it realistic and practical — not overwhelming.

Return ONLY valid JSON in this exact format:
{
  "planTitle": "Your 7-Day Study Plan",
  "totalHours": ${availableHoursPerWeek},
  "focus": "One sentence summarizing the main focus",
  "days": [
    {
      "day": "Monday",
      "date": null,
      "totalMinutes": 90,
      "tip": "Short motivational tip for this day",
      "sessions": [
        {
          "topic": "Topic Name",
          "type": "study|practice|review|project|rest",
          "durationMinutes": 45,
          "description": "What to do in this session (2-3 sentences)",
          "resources": "Suggested resource or activity (optional)"
        }
      ]
    }
  ]
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    });

    const raw = response.text?.trim();
    if (!raw) return res.status(503).json({ error: "AI generation failed. Please try again." });

    let plan: any;
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      plan = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    } catch {
      return res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    }

    logger.info("Study plan generated successfully");
    return res.json({ plan, generatedAt: new Date().toISOString() });
  } catch (err) {
    logger.error({ err }, "Study plan generation error");
    return res.status(503).json({ error: "AI is temporarily unavailable. Please try again." });
  }
});

export default router;
