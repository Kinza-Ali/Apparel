import mongoose from "mongoose";
import Joi from "@hapi/joi";
const orderSchema = mongoose.Schema(
  {
    orderId: Number,

    item: [{ type: Number, required: "Enter the product id" }],
    price: {
      type: Number,
      required: "Kindly enter the price",
    },
    //add user id
  },
  { timestamps: true }
);
export function validateOrder(data) {
  const schema = Joi.object({
    item: Joi.array().items(Joi.number()).required(),
    orderId: Joi.number().min(5).required(),
    price: Joi.number().required(),
  });
  return schema.validate(data, { abortEarly: true });
}

export const Order = mongoose.model("Order", orderSchema);
