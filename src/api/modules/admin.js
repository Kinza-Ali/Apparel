// import { userRole } from "./constants.js";
import { forbiddenResponse } from "./apiResponses.js";
import { Admin } from "./constants.js";
export const admin = (req, res, next) => {
  if (req.user.role != Admin) return res.status(403).send(forbiddenResponse());
  next();
};
