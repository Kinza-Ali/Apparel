import {
  validateOrderSchema,
  validateOrderUpdateSchema,
} from "../../resources/order/orderModel.js";
import { validationResponse } from "../apiResponses.js";

export const validateOrder = (req, res, next) => {
  let { error } = validateOrderSchema(req.body);
  if (error)
    return res.status(400).send(validationResponse(error.details[0].message));
  next();
};

export const validateOrderUpdate = (req, res, next) => {
  let { error } = validateOrderUpdateSchema(req.body);
  if (error)
    return res.status(400).send(validationResponse(error.details[0].message));
  next();
};
