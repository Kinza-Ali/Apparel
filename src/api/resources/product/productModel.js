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
// Validating Products at Post request
export function validateProd(data) {
  const schema = Joi.object({
    productName: Joi.string().min(3).max(20).required(),
    productId: Joi.string().min(5).required(),
    productType: Joi.number().max(1).required(),
    price: Joi.number().min(50).required(),
    quantity: Joi.number().required(),
    image: Joi.string(),
  });
  return schema.validate(data, { abortEarly: true });
}

// Validating Products at Update request
export function validateProdUpdate(data) {
  const schema = Joi.object({
    productName: Joi.string().min(3).max(20),
    productId: Joi.string().min(5),
    productType: Joi.number().max(1),
    price: Joi.number().min(50),
    quantity: Joi.number(),
    image: Joi.string(),
  });
  return schema.validate(data, { abortEarly: true });
}

export const Product = mongoose.model("Product", productSchema);
