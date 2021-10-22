import mongoose from "mongoose";
import Joi from "@hapi/joi";
const orderSchema = mongoose.Schema(
  {
    orderId: Number,

    item: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
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
    item: Joi.array().items(Joi.string()).required(),
    orderId: Joi.number().min(5).required(),
    price: Joi.number().required(),
  });
  return schema.validate(data, { abortEarly: true });
}

export const Order = mongoose.model("Order", orderSchema);
