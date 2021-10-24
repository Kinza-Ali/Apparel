import express from "express";
import productController from "./productController.js";
import { auth } from "../../modules/auth.js";
import { admin } from "../../modules/admin.js";
import {
  validateProduct,
  validateProductUpdate,
} from "../../modules/middlewares/validateProduct.js";

export const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getAll)
  .post(auth, admin, validateProduct, productController.createOne);

productRouter
  .route("/:id")
  .get(productController.getOne)
  .put(auth, admin, validateProductUpdate, productController.updateOne)
  .delete(auth, admin, productController.deleteOne);
