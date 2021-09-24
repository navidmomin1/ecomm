// import { Schema as _Schema, model } from "mongoose";

import pkg from "mongoose";
const { Schema: _Schema, model } = pkg;
import bcrypt from "bcrypt";

// const environment = process.env.NODE_ENV;
// const stage = require("./config")[environment];

// schema maps to a collection
const Schema = _Schema;

const userSchema = new Schema(
  {
    name: {
      type: "String",
      trim: true,
    },
    password: {
      type: "String",
      required: true,
      trim: true,
    },
    gender: {
      type: "String",
      trim: true,
    },
    phone: {
      type: "String",
      trim: true,
    },
    role: {
      type: "String",
      trim: true,
      required: true,
      enum: ["admin", "client"],
    },
    email: {
      type: "String",
      required: true,
      trim: true,
      unique: true,
    },
  },
  { collection: "users" }
);

// encrypt password before save
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    // don't rehash if it's an old user
    next();
  } else {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        console.log("Error hashing password for user", user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

export default model("User", userSchema);
