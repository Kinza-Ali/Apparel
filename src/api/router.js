import express from "express";
import { userRouter } from "./resources/user/userRouter.js";
import { productRouter } from "./resources/product/productRouter.js";
import { apiErrorHandler } from "./modules/errorHandler.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use(apiErrorHandler);

export default router;
