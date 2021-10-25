import mongoose from "mongoose";
import Joi from "@hapi/joi";
const orderSchema = mongoose.Schema(
  {
    item: [
      {
        productId: String,
        quantity: Number,
      },
    ],
    price: {
      type: Number,
    },
    deliveryDate: Date,
  },
  { timestamps: true }
);
export function validateOrderSchema(data) {
  const schema = Joi.object({
    item: Joi.array().required(),
    deliveryDate: Joi.date().required(),
  });
  return schema.validate(data, { abortEarly: true });
}

export function validateOrderUpdateSchema(data) {
  const schema = Joi.object({
    deliveryDate: Joi.date(),
  });
  return schema.validate(data, { abortEarly: true });
}

export const Order = mongoose.model("Order", orderSchema);
