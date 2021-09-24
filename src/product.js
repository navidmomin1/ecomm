import dotenv from "dotenv";
dotenv.config();

import { authentication } from "./middleware/authentication.js";
import mongoose from "mongoose";
import productSchema from "./schema/models/product.js";
import reviewSchema from "./schema/models/review.js";
import http from "http";
import fs from "fs";
import multer from "multer";
import csv from "fast-csv";
import { exit } from "process";
import { getEmail } from "./utils.js";
import { Client } from "@elastic/elasticsearch";

const upload = multer({ dest: "tmp/csv/" });
const connUri = "mongodb://localhost:27017/grocery";

function products(req, res, next) {
  const fileRows = [];
  let status = 200;
  let result = {};
  // open uploaded file
  csv
    .parseFile(req.file.path, { headers: true, maxRows: 100 }) // upper boundary set to 100 only for demo
    .on("data", function (data) {
      // console.log(data);
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      console.log(fileRows.length);
      fs.unlinkSync(req.file.path); // remove temp file
      mongoose.connect(connUri, { useNewUrlParser: true });

      const product = mongoose.model("Product", productSchema);

      product
        .insertMany(fileRows, { ordered: false })
        .then(function () {
          console.log("Data inserted"); // Success
          res.status(status).send({ result: "data uploaded successfully" });
        })
        .catch(function (error) {
          status = 500;
          console.log(error); // Failure
          res.status(status).send({ error: error });
        });
    });
}

function review(req, res, next) {
  mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
    let result = {};
    let status = 200;

    if (!err) {
      const { barcode, review } = req.body;
      let reviewDocument = new reviewSchema();
      reviewDocument.barcode = barcode;
      reviewDocument.review = review;
      reviewDocument.email = getEmail(req, res, next);
      reviewDocument.timestamp = new Date().toISOString();
      reviewSchema.findOne({ barcode }, (err, reviewSchema) => {
        if (!err && reviewSchema) {
          console.log("product found");
          console.log(reviewDocument.email);
          console.log(reviewDocument.timestamp);
          reviewDocument.save((err, reviewDocument) => {
            if (!err) {
              result.status = status;
              result.result = reviewDocument;
            } else {
              status = 500;
              result.status = status;
              result.error = err;
            }
            res.status(status).send(result);
          });
        } else {
          console.log("no product found");
          status = 404;
          result.status = status;
          result.error = "Product not found";
          res.status(status).send(result);
        }
      });
    } else {
      status = 500;
      result.status = status;
      result.error = err;
      res.status(status).send(result);
    }
  });
}

async function search(req, res, next) {
  const client = new Client({ node: "http://localhost:9200" });
  const { searchText } = req.body;
  const { body } = await client.search({
    index: "products",
    body: {
      query: {
        multi_match: {
          query: searchText,
          fields: ["name", "description", "brand", "reviews"],
        },
      },
    },
  });
  res.status(200).send({ result: body, status: 200 });
}

function index(req, res, next) {
  const client = new Client({ node: "http://localhost:9200" });

  // indexing some data
  client.index({
    index: "products",
    body: {
      name: "Priya Rice Bag (20 kg)",
      barcode: 34898998,
      brand: "Priya",
      description: "Priya Rice Bag (20 kg)",
      price: 200,
      available: true,
      reviews: [
        {
          name: "Adam",
          _id: "",
          review: "Good Product.....",
        },
        {
          name: "Eve",
          review: "Worth of money....",
        },
      ],
    },
  });
  client.index({
    index: "products",
    body: {
      name: "fortune oil 5 litr",
      barcode: 34898998,
      brand: "fortune",
      description: "fortune oil 5 lit",
      price: 100,
      available: true,
      reviews: [
        {
          name: "Adam",
          _id: "",
          review: "Good Product.....",
        },
        {
          name: "Eve",
          review: "Worth of money....",
        },
      ],
    },
  });
  res.status(200).send({ result: "indexing done", status: 200 });
}

export { products, review, search, index };
