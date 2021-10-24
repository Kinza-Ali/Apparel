import express from "express";
import orderController from "./orderController.js";
import { auth } from "../../modules/auth.js";
import { admin } from "../../modules/admin.js";
import {
  validateOrder,
  validateOrderUpdate,
} from "../../modules/middlewares/validateOrder.js";
import { Order } from "./orderModel.js";
import { Product } from "../product/productModel.js";
import {
  errorResponse,
  successResponsePost,
} from "../../modules/apiResponses.js";

export const orderRouter = express.Router();

orderRouter.route("/").get(auth, admin, orderController.getAll);

orderRouter.post("/", auth, admin, validateOrder, async (req, res) => {
  try {
    var item = req.body.item;

    for (let keys in item) {
      let temp = await Product.findOne({ _id: item[keys].productId });
      if (item[keys].quantity > temp.quantity) {
        res.send(errorResponse(res));
      } else {
        let updatedQuantity = temp.quantity - item[keys].quantity;
        await Product.findOneAndUpdate(
          { _id: temp._id },
          { quantity: updatedQuantity },
          { new: true }
        );
      }
      Order.create(req.body)
        .then((doc) => res.status(200).send(successResponsePost(doc, "post")))
        .catch((error) => res.send(error));
    }
  } catch (error) {
    console.log(error);
  }
});

orderRouter
  .route("/:id")
  .get(auth, admin, orderController.getOne)
  .put(auth, admin, validateOrderUpdate, orderController.updateOne)
  .delete(auth, admin, orderController.deleteOne);
