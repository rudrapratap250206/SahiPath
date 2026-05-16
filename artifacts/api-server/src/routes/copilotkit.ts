import { Router } from "express";
import { CopilotRuntime, GoogleGenerativeAIAdapter } from "@copilotkit/runtime";
import { createCopilotExpressHandler } from "@copilotkit/runtime/v2/express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY?.trim();

const copilotRouter = Router();

copilotRouter.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  next();
});

if (!apiKey) {
  copilotRouter.use((_req, res) => {
    res.status(503).json({
      error: "GEMINI_API_KEY is not configured. Add it to your Replit Secrets to enable the AI assistant.",
    });
  });
} else {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const serviceAdapter = new GoogleGenerativeAIAdapter({ model });

  const runtime = new CopilotRuntime();
  runtime.handleServiceAdapter(serviceAdapter);

  const copilotHandler = createCopilotExpressHandler({
    runtime: runtime.instance,
    basePath: "/",
    cors: false,
  });

  copilotRouter.use(copilotHandler);
}

export default copilotRouter;
