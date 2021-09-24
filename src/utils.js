import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import multer from "multer";
// const parser = csv({ headers: true });

function getEmail(req, res, next) {
  const authorizationHeaader = req.headers.authorization;

  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token, {
      complete: true,
    });

    if (!decodedToken) {
      res.send("unable to decode token");
    }
    let email = decodedToken.payload.user;
    console.log("emil", email);
    return email;
  }
}

export { getEmail };
