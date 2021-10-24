import {
  validateOrderSchema,
  validateOrderUpdateSchema,
} from "../../resources/order/orderModel.js";

export const validateOrder = (req, res, next) => {
  let { error } = validateOrderSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

export const validateOrderUpdate = (req, res, next) => {
  let { error } = validateOrderUpdateSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
