import jwt from "jsonwebtoken";
import config from "config";
import { User } from "../resources/user/userModel.js";
export const auth = async (req, res, next) => {
  let token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Token NOt provided");
  try {
    console.log(config.get("jwtPrivateKey"));
    let user = jwt.verify(token, "test");
    req.user = await User.findById(user._id);
  } catch {
    return res.status(401).send("Invalid Token");
  }
  next();
};
