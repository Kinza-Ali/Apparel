import {
  validateUserLoginSchema,
  validateUserUpdateSchema,
} from "../../resources/user/userModel.js";
import { userValidationResponse } from "../apiResponses.js";

export const validateUserLogin = (req, res, next) => {
  let { error } = validateUserLoginSchema(req.body);
  if (error)
    return res
      .status(400)
      .send(userValidationResponse(error.details[0].message));
  next();
};

export const validateUserUpdate = (req, res, next) => {
  let { error } = validateUserUpdateSchema(req.body);

  if (error)
    return res
      .status(400)
      .send(userValidationResponse(error.details[0].message));
  next();
};
