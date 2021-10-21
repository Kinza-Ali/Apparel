import express from "express";
import productController from "./productController.js";
import { auth } from "../../modules/auth.js";
import { admin } from "../../modules/admin.js";

export const productRouter = express.Router();

productRouter.param("id", productController.findByParam);

productRouter
  .route("/")
  .get(productController.getAll)
  .post(auth, admin, productController.createOne);

productRouter
  .route("/:id")
  .get(productController.getOne)
  .put(productController.updateOne)
  .delete(productController.deleteOne);
