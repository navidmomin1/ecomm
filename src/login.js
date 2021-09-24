import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import user from "./schema/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

console.log(process.env.MONGO_CONN_URL);
const connUri = "mongodb://localhost:27017/grocery";
// console.log(connUri);
export default function login(req, res) {
  mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
    let result = {};
    let status = 200;

    if (!err) {
      let { email, password } = req.body;

      user.findOne({ email }, (err, user) => {
        // console.log(user.role);
        // console.log(password);

        if (!err && user) {
          // We could compare passwords in our model instead of below as well
          bcrypt
            .compare(password, user.password)
            .then((match) => {
              if (match) {
                status = 200;
                // Create a token
                const payload = { user: user.email, role: user.role };
                // console.log(payload);
                const options = {
                  expiresIn: "1d",
                  issuer: "https://grocery.ai",
                };
                console.log(process.env.JWT_SECRET);
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);

                // console.log("TOKEN", token);
                result.token = token;
                result.status = status;
                result.result = user;
              } else {
                status = 401;
                result.status = status;
                result.error = `Authentication error`;
              }
              res.status(status).send(result);
            })
            .catch((err) => {
              // console.log("here");
              status = 500;
              result.status = status;
              result.error = err;
              res.status(status).send(result);
            });
        } else {
          status = 404;
          result.status = status;
          result.error =
            "User does not exists, please register first and then login";
          res.status(status).send(result);
        }
      });
    } else {
      console.log("there");
      status = 500;
      result.status = status;
      result.error = err;
      res.status(status).send(result);
    }
  });
}
