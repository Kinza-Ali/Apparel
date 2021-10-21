import mongoose from "mongoose";
import Joi from "@hapi/joi";
const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: "Kindly enter the name of the task",
  },
  productCode: {
    type: String,
    required: "Kindly enter the name of the task",
  },
  image: String,
  productType: {
    type: String,
    required: "Kindly enter the name of the task",
  },
});

export const Product = mongoose.model("Product", productSchema);
