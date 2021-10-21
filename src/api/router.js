import express from "express";
import { userRouter } from "./resources/user/userRouter.js";
import { productRouter } from "./resources/product/productRouter.js";
import { orderRouter } from "./resources/order/orderRouter.js";
import { apiErrorHandler } from "./modules/errorHandler.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use(apiErrorHandler);

export default router;
