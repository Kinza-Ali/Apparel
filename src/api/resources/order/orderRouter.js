import express from "express";
import orderController from "./orderController.js";
import { auth } from "../../modules/auth.js";
import { admin } from "../../modules/admin.js";
import { validateOrder } from "../../modules/middlewares/validateOrder.js";

export const orderRouter = express.Router();

// orderRouter.param("id", orderController.findByParam);

orderRouter
  .route("/")
  .get(auth, admin, orderController.getAll)
  .post(auth, admin, validateOrder, orderController.createOne);

orderRouter
  .route("/:id")
  .get(auth, admin, orderController.getOne)
  .put(auth, admin, validateOrder, orderController.updateOne)
  .delete(auth, admin, orderController.deleteOne);
