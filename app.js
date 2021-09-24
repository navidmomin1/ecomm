import dotenv from "dotenv";
dotenv.config();
import express from "express";
import registration from "./src/user.js";
import { index, products, review, search } from "./src/product.js";
import login from "./src/login.js";
import {
  authentication,
  isAdmin,
  isClient,
} from "./src/middleware/authentication.js";
import multer from "multer";
const upload = multer({ dest: "tmp/csv/" });

const app = express();

const port = 4800;

app.use(express.json({ extended: false }));

app.post("/login", (req, res) => {
  login(req, res);
});

app.post("/user/registration", (req, res) => {
  registration(req, res);
});

app.post("/products/index", (req, res) => {
  index(req, res);
});

app.post(
  "/products",
  [authentication, isAdmin, upload.single("file")],
  (req, res, next) => {
    products(req, res, next);
  }
);

app.post("/products/review", [authentication, isClient], (req, res, next) => {
  review(req, res, next);
});

app.post("/products/search", [authentication, isClient], (req, res, next) => {
  search(req, res, next);
});

app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("Server is up and running & listening");
  }
});
