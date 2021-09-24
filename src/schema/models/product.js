// import { Schema as _Schema, model } from "mongoose";

import pkg from "mongoose";
const { Schema: _Schema, model } = pkg;

// const environment = process.env.NODE_ENV;
// const stage = require("./config")[environment];

// schema maps to a collection
const Schema = _Schema;

const productSchema = new Schema(
  {
    name: {
      type: "String",
      trim: true,
      required: true,
    },
    barcode: {
      type: "Number",
      required: true,
      trim: true,
      unique: true,
    },
    brand: {
      type: "String",
      trim: true,
      required: true,
    },
    description: {
      type: "String",
      trim: true,
    },
    price: {
      type: "Number",
      trim: true,
      required: true,
    },
    available: {
      type: "Boolean",
      required: true,
      trim: true,
      required: true,
    },
  },
  { collection: "products" }
);

export default productSchema;
