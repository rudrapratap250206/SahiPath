import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import mentorRouter from "./mentor";
import profileRouter from "./profile";
import testsRouter from "./tests";
import mediaRouter from "./media";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(mentorRouter);
router.use(profileRouter);
router.use(testsRouter);
router.use(mediaRouter);

export default router;
