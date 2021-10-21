import mongoose from "mongoose";
import Joi from "@hapi/joi";
const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: "Kindly enter the order Id",
    },

    item: [{ type: Number, required: "Enter the product id" }],
    price: {
      type: Number,
      required: "Kindly enter the price",
    },
    //add user id
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
