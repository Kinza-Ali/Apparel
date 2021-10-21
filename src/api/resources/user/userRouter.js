import express from "express";
import userController from "./userController.js";

export const userRouter = express.Router();

userRouter.route("/").get(userController.getAll).post(userController.createOne);

userRouter
  .route("/:id")
  .get(userController.getOne)
  .put(userController.updateOne)
  .delete(userController.deleteOne);
