import express from "express";
import orderController from "./orderController.js";
import { auth } from "../../modules/auth.js";
import { admin } from "../../modules/admin.js";

export const orderRouter = express.Router();

// orderRouter.param("id", orderController.findByParam);

orderRouter
  .route("/")
  .get(auth, admin, orderController.getAll)
  .post(auth, admin, orderController.createOne);

orderRouter
  .route("/:id")
  .get(auth, admin, orderController.getOne)
  .put(auth, admin, orderController.updateOne)
  .delete(auth, admin, orderController.deleteOne);
