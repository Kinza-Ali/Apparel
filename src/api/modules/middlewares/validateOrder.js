import { validate_Order } from "../../resources/order/orderModel.js";

export const validateOrder = (req, res, next) => {
  let { error } = validate_Order(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
