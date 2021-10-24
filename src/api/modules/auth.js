import jwt from "jsonwebtoken";
import { User } from "../resources/user/userModel.js";
import { unauthorizedResponse } from "./apiResponses.js";

export const auth = async (req, res, next) => {
  let token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Token NOt provided");
  try {
    let user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(user._id);
  } catch {
    return res.status(401).send(unauthorizedResponse("token"));
  }
  next();
};
