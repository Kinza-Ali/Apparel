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
export function validate_Order(data) {
  const schema = Joi.object({
    item: Joi.array().required(),
    orderId: Joi.number().min(5).required(),
    price: Joi.number().required(),
  });
  return schema.validate(data, { abortEarly: true });
}

export const Order = mongoose.model("Order", orderSchema);
