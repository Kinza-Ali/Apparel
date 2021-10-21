import express from "express";
import productController from "./productController.js";

export const productRouter = express.Router();

productRouter.param("id", productController.findByParam);

productRouter
  .route("/")
  .get(productController.getAll)
  .post(productController.createOne);

productRouter
  .route("/:id")
  .get(productController.getOne)
  .put(productController.updateOne)
  .delete(productController.deleteOne);
