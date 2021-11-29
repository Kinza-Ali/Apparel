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
  notFoundResponse,
  errorProductNotFound,
} from "../../modules/apiResponses.js";

export const orderRouter = express.Router();
// Add auth,admin middlewares back again to authenticate the routes;
orderRouter.route("/").get(auth, admin, orderController.getAll);

orderRouter.post("/", validateOrder, async (req, res) => {
  try {
    var item = req.body.item;
    let product = null;
    let totalPrice = 0;
    for (let keys in item) {
      product = await Product.findOne({ _id: item[keys].productId });
      if (product === null) {
        res.send(errorProductNotFound(res));
      }
      let price = product.price * item[keys].quantity;
      totalPrice = totalPrice + price;

      if (item[keys].quantity > product.quantity) {
        res.send(errorResponse(res));
      } else {
        let updatedQuantity = product.quantity - item[keys].quantity;
        await Product.findOneAndUpdate(
          { _id: product._id },
          { quantity: updatedQuantity },
          { new: true }
        );
      }
    }
    // Order.create(req.body);

    var order = new Order();
    order.item = req.body.item;
    order.price = totalPrice;
    order.deliveryDate = req.body.deliveryDate;
    order.customerId = req.body.customerId;
    order.address = req.body.address;
    order.save(function (err, doc) {
      if (err) res.status(404).send(notFoundResponse());
      res.status(200).send(successResponsePost(doc, "post"));
    });
  } catch (error) {
    console.log(error);
  }
});

orderRouter
  .route("/:id")
  .get(auth, admin, orderController.getOne)
  .put(auth, admin, validateOrderUpdate, orderController.updateOne)
  .delete(auth, admin, orderController.deleteOne);
