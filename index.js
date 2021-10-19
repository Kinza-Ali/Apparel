// var server = require("./src/server");
// server.start();
// import app from "./src/server";

import express from "express";
import router from "./src/api/router.js";

import mongoose from "mongoose";
import config from "config";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

// connecting mongoose....
mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo .... "))
  .catch((error) => console.log(error.message));
app.listen(3002, () => {
  console.log("connected to server");
});
