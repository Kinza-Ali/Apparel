import express from "express";
import orderController from "./orderController.js";
import { auth } from "../../modules/auth.js";
import { admin } from "../../modules/admin.js";
import { validateOrder } from "../../modules/middlewares/validateOrder.js";
import { Order } from "./orderModel.js";
import { Product } from "../product/productModel.js";

export const orderRouter = express.Router();

// orderRouter.param("id", orderController.findByParam);

orderRouter.route("/").get(auth, admin, orderController.getAll);
// .post(auth, admin, validateOrder, orderController.createOne);

orderRouter.post("/", async (req, res) => {
  try {
    var item = req.body.item;
    let product = [];
    let isOutOfStock;

    for (let keys in item) {
      let temp = await Product.findOne({ _id: item[keys].productId });
      if (item[keys].quantity > temp.quantity) {
        res.json({ message: "Out of stock" });
      } else {
        let updatedQuantity = temp.quantity - item[keys].quantity;
        await Product.findOneAndUpdate(
          { _id: temp._id },
          { quantity: updatedQuantity },
          { new: true }
        );
      }
    }

    // res.json(product);
  } catch (error) {
    console.log(error);
  }

  var newOrder = new Order(req.body);
  newOrder.save(function (err, newOrder) {
    if (err) res.send(err);
    res.json(newOrder);
  });
});

orderRouter
  .route("/:id")
  .get(auth, admin, orderController.getOne)
  .put(auth, admin, validateOrder, orderController.updateOne)
  .delete(auth, admin, orderController.deleteOne);
