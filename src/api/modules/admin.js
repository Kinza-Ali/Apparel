// import { userRole } from "./constants.js";
import { Admin } from "./constants.js";
export const admin = (req, res, next) => {
  if (req.user.role != Admin) return res.status(403).send("Not Authorized ");
  next();
};
