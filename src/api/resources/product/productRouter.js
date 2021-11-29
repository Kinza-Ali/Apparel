import express from "express";
import productController from "./productController.js";
import { auth } from "../../modules/auth.js";
import { admin } from "../../modules/admin.js";
import { Product } from "./productModel.js";
import multer from "multer";
import {
  validateProduct,
  validateProductUpdate,
} from "../../modules/middlewares/validateProduct.js";
import { successRegister } from "../../modules/apiResponses.js";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dfd7qmtdr",
  api_key: "371361827597883",
  api_secret: "nRYJQcwVUrb7oxHOrhXkCMAmWjQ",
  secure: true,
});

export const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getAll)
  .post(auth, admin, validateProduct, productController.createOne);

// productRouter.post("/", auth, admin, async (req, res) => {
//   console.log("Request: " + req);
//   console.log(req.files);
//   console.log("body: " + JSON.stringify(req.body));
//   const file = req.files.image;
//   const uniqueFileName = req.body.code;
//   const { productName, price, productType, quantity } = req.body;
//   try {
//     const image = await cloudinary.uploader.upload(file.tempFilePath, {
//       public_id: `images/${uniqueFileName}`,
//       tags: "images",
//     });
//     if (image) {
//       const newProduct = new Product({
//         productName,
//         price,
//         productType,
//         quantity,
//         image: image.url,
//       });
//       const response = await newProduct.save();
//       if (response) {
//         res.status(201).json({
//           success: true,
//           data: response,
//         });
//       } else {
//         res.status(501).json({
//           success: false,
//           data: [],
//           message: "Error while adding product",
//         });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

productRouter
  .route("/:id")
  .get(productController.getOne)
  .put(auth, admin, validateProductUpdate, productController.updateOne)
  .delete(auth, admin, productController.deleteOne);
