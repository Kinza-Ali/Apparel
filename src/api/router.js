var express = require("express");
var userRouter = require("./resources/user/userRouter");
var apiErrorHandler = require("./modules/errorHandler");

const router = express.Router();

router.use("/user", userRouter);
router.use(apiErrorHandler);
module.exports = router;
