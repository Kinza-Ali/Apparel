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
      required: "Kindly enter the price",
    },
    //add user id
  },
  { timestamps: true }
);
export function validateOrderSchema(data) {
  const schema = Joi.object({
    item: Joi.array().required(),
    price: Joi.number().required(),
  });
  return schema.validate(data, { abortEarly: true });
}

export function validateOrderUpdateSchema(data) {
  const schema = Joi.object({
    item: Joi.array(),
    price: Joi.number(),
  });
  return schema.validate(data, { abortEarly: true });
}

export const Order = mongoose.model("Order", orderSchema);
