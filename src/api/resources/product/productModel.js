import mongoose from "mongoose";
import Joi from "@hapi/joi";
const productSchema = mongoose.Schema({
  productName: String,
  image: String,
  productType: Number,
  price: Number,
  quantity: Number,
});
// Validating Products at Post request
export function validateProd(data) {
  const schema = Joi.object({
    productName: Joi.string().min(3).max(20).required(),
    productType: Joi.number().required(),
    price: Joi.number().min(2).required(),
    quantity: Joi.number().required(),
    image: Joi.string(),
  });
  return schema.validate(data, { abortEarly: true });
}

// Validating Products at Update request
export function validateProdUpdate(data) {
  const schema = Joi.object({
    productName: Joi.string().min(3).max(20),
    productType: Joi.number(),
    price: Joi.number().min(1),
    quantity: Joi.number(),
    image: Joi.string(),
  });
  return schema.validate(data, { abortEarly: true });
}

export const Product = mongoose.model("Product", productSchema);
