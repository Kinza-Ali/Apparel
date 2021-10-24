import express from "express";
import userController from "./userController.js";
import { User, validateUserLogin, validateUserSignUp } from "./userModel.js";
import _ from "lodash";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRouter = express.Router();

userRouter.route("/").get(userController.getAll);
// .post(userController.createOne);

userRouter.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already exists");
    let { error } = validateUserSignUp(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.contact = req.body.contact;
    user.dateOfBirth = req.body.dateOfBirth;
    await user.generateHashedPassword();
    await user.save();
    return res.send(_.pick(user, ["name", "email"]));
  } catch (error) {
    console.log(error);
  }
});

//for authentication of login
userRouter.post("/login", async (req, res) => {
  //check for existing email
  try {
    let { error } = validateUserLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) return res.status(400).send("Email doesn't exist");
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).send("Invalid Password"); //password: 1234
    let token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET
    );
    res.send(token);
  } catch (error) {
    console.log(error.message);
  }
});
userRouter
  .route("/:id")
  .get(userController.getOne)
  .put(userController.updateOne)
  .delete(userController.deleteOne);
