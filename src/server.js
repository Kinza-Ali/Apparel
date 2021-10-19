// // const express = require("express");
// // const router = require("./api/router");
// // var setGlobalMiddleware = require("./middleware");
// // const connect = require("./db");

// // const app = express();
// // //optional
// // setGlobalMiddleware.setGlobalMiddleware(app);
// // connect();

// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());
// // app.use("/api", router);

// // // const start = () => {
// // //   app.listen(3000, () => {
// // //     console.log("server is running on 3000");
// // //   });
// // // };
// // module.exports.app = app;
// // // module.exports.start = start;
// import express from "express";
// import { router } from "./src/api";
// import mongoose from "mongoose";
// import config from "config";

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use("/api", router);

// // connecting mongoose....
// mongoose
//   .connect(config.get("db"), {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to Mongo .... "))
//   .catch((error) => console.log(error.message));

// export default app;
