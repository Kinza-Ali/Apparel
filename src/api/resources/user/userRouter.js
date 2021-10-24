import express from "express";
import userController from "./userController.js";
import { User, validateUserSignUp } from "./userModel.js";
import _ from "lodash";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  successRegister,
  successToken,
  unauthorizedResponse,
  userValidationResponse,
} from "../../modules/apiResponses.js";
import { auth } from "../../modules/auth.js";
import { admin } from "../../modules/admin.js";
import {
  validateUserLogin,
  validateUserUpdate,
} from "../../modules/middlewares/validateUser.js";

export const userRouter = express.Router();

userRouter.route("/").get(auth, admin, userController.getAll);

userRouter.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already exists");
    let { error } = validateUserSignUp(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    user = new User(req.body);
    await user.generateHashedPassword();
    await user.save();
    let doc = _.pick(user, ["name", "email"]);
    return res.send(successRegister(doc));
  } catch (error) {
    console.log(error);
  }
});

//for authentication of login
userRouter.post("/login", validateUserLogin, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .send(userValidationResponse("Email doesn't exist"));
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).send(unauthorizedResponse("password"));
    let token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET
    );
    res.send(successToken(token));
  } catch (error) {
    console.log(error.message);
  }
});
userRouter
  .route("/:id")
  .get(auth, admin, userController.getOne)
  .put(auth, validateUserUpdate, userController.updateOne)
  .delete(auth, admin, userController.deleteOne);
