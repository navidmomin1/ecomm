// import { Schema as _Schema, model } from "mongoose";

import pkg from "mongoose";
const { Schema: _Schema, model } = pkg;

// const environment = process.env.NODE_ENV;
// const stage = require("./config")[environment];

// schema maps to a collection
const Schema = _Schema;

const reviewSchema = new Schema(
  {
    email: {
      type: "String",
      trim: true,
      required: true,
    },
    barcode: {
      type: "Number",
      required: true,
      trim: true,
    },
    review: {
      type: "String",
      trim: true,
      required: true,
    },
    timestamp: {
      type: "String",
      trim: true,
      required: true,
      unique: true,
    },
  },
  { collection: "reviews" }
);

export default model("review", reviewSchema);
