import express from "express";
import orderController from "./orderController.js";

export const orderRouter = express.Router();

// orderRouter.param("id", orderController.findByParam);

orderRouter
  .route("/")
  .get(auth, admin, orderController.getAll)
  .post(auth, admin, orderController.createOne);

orderRouter
  .route("/:id")
  .get(auth, admin, orderController.getOne)
  .put(oauth, admin, rderController.updateOne)
  .delete(auth, admin, orderController.deleteOne);
