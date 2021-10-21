import express from "express";
import orderController from "./orderController.js";

export const orderRouter = express.Router();

// orderRouter.param("id", orderController.findByParam);

orderRouter
  .route("/")
  .get(orderController.getAll)
  .post(orderController.createOne);

orderRouter
  .route("/:id")
  .get(orderController.getOne)
  .put(orderController.updateOne)
  .delete(orderController.deleteOne);
