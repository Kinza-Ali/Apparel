import express from "express";
import router from "./src/api/router.js";
import mongoose from "mongoose";
import config from "config";
import dotenv from "dotenv";
import cors from "cors";
import fileupload from "express-fileupload";
dotenv.config();
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json({}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(
  fileupload({
    useTempFiles: true,
  })
);
app.use("/api", router);

// connecting mongoose....
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo .... "))
  .catch((error) => console.log(error.message));
app.listen(62500, () => {
  console.log("connected to server");
});
