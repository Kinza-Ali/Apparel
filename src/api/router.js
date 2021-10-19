import express from "express";
import { userRouter } from "./resources/user/userRouter.js";
import { apiErrorHandler } from "./modules/errorHandler.js";

const router = express.Router();

router.use("/user", userRouter);
router.use(apiErrorHandler);

export default router;
