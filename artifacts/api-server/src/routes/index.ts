import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import mentorRouter from "./mentor";
import profileRouter from "./profile";
import testsRouter from "./tests";
import mediaRouter from "./media";
import copilotKitRouter from "./copilotkit";
import studyPlanRouter from "./studyplan";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(mentorRouter);
router.use(profileRouter);
router.use(testsRouter);
router.use(mediaRouter);
router.use(studyPlanRouter);
router.use("/copilotkit", copilotKitRouter);
router.use("/copilot", copilotKitRouter);

export default router;
