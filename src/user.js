import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import userSchema from "./schema/models/user.js";

const connUri = "mongodb://localhost:27017/grocery";
// console.log(connUri);
export default function registration(req, res) {
  mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
    let result = {};
    let status = 200;

    if (!err) {
      const { name, password, phone, email, role, gender } = req.body;
      let user = new userSchema();
      user.name = name;
      user.password = password;
      user.role = role;
      user.gender = gender;
      user.phone = phone;
      user.email = email;

      user.save((err, user) => {
        if (!err) {
          result.status = status;
          result.result = user;
        } else {
          status = 500;
          result.status = status;
          result.error = err;
        }
        res.status(status).send(result);
      });
    } else {
      status = 500;
      result.status = status;
      result.error = err;
      res.status(status).send(result);
    }
  });
}
