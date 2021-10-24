import {
  validateProd,
  validateProdUpdate,
} from "../../resources/product/productModel.js";
import { validationResponse } from "../apiResponses.js";
export const validateProduct = (req, res, next) => {
  let { error } = validateProd(req.body);
  if (error)
    return res.status(400).send(validationResponse(error.details[0].message));
  next();
};

export const validateProductUpdate = (req, res, next) => {
  let { error } = validateProdUpdate(req.body);
  if (error)
    return res.status(400).send(validationResponse(error.details[0].message));
  next();
};
