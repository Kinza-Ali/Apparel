import express from "express";
import productController from "./productController.js";
import { auth } from "../../modules/auth.js";
import { admin } from "../../modules/admin.js";
import { validateProduct } from "../../modules/middlewares/validateProduct.js";

export const productRouter = express.Router();

productRouter.param("id", productController.findByParam);

productRouter
  .route("/")
  .get(productController.getAll)
  .post(auth, admin, validateProduct, productController.createOne);

productRouter
  .route("/:id")
  .get(productController.getOne)
  .put(auth, admin, productController.updateOne)
  .delete(auth, admin, productController.deleteOne);
