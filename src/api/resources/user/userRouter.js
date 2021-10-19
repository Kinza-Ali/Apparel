const express = require("express");
const userController = require("./userController");

const userRouter = express.Router();
console.log(userController);
userRouter.param("id", userController.findByParam);

userRouter.route("/").get(userController.getAll).post(userController.createOne);
// userRouter.route("/").post(userController.createOne);
userRouter
  .route("/:id")
  .get(userController.getOne)
  .put(userController.updateOne)
  .delete(userController.deleteOne);

module.exports = userRouter;
