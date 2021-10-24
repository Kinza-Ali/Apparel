import mongoose from "mongoose";
import Joi from "@hapi/joi";
const productSchema = mongoose.Schema({
  productName: String,
  productId: String,
  image: String,
  productType: Number,
  price: Number,
  quantity: Number,
});
// Validating Products
export function validateProd(data) {
  const schema = Joi.object({
    productName: Joi.string().min(3).max(20).required(),
    productId: Joi.string().min(5).required(),
    productType: Joi.number().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  });
  return schema.validate(data, { abortEarly: true });
}

export const Product = mongoose.model("Product", productSchema);
