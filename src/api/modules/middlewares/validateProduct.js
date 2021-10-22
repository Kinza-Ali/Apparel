import { validateProd } from "../../resources/product/productModel.js";

export const validateProduct = (req, res, next) => {
  let { error } = validateProd(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
