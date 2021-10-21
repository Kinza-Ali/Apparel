import mongoose from "mongoose";
import Joi from "@hapi/joi";
const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: "Kindly enter the product name",
  },
  productId: {
    type: String,
    required: "Kindly enter the product id",
  },
  image: String,
  productType: {
    type: String,
    required: "Kindly enter the product type",
  },
  price: {
    type: Number,
    required: "Kindly enter the price",
  },
});

export const Product = mongoose.model("Product", productSchema);
