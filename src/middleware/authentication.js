import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

function authentication(req, res, next) {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const options = {
      expiresIn: "1d",
      issuer: "https://grocery.ai",
    };
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      // result = jwt.verify(token, process.env.JWT_SECRET, options);
      result = jwt.verify(
        token,
        process.env.JWT_SECRET,
        options,
        (err, verified) => {
          if (err) {
            return res.status(401).json({ error: "Invalid crendentials" });
          }
          return verified;
        }
      );

      // Let's pass back the decoded token to the request object
      req.decoded = result;
      // We call next to pass execution to the subsequent middleware
      console.log("3");
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      return 0;
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401,
    };
    res.status(401).send(result);
  }

  return 1;
}

function isAdmin(req, res, next) {
  const authorizationHeaader = req.headers.authorization;

  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token, {
      complete: true,
    });

    if (!decodedToken) {
      res.send("unable to decode token");
    }
    let userRole = decodedToken.payload.role;
    console.log(userRole);
    if (userRole === "admin") {
      next();
    } else {
      res.status(403).send({ error: "Not Authorised", status: 403 });
    }
  }
}

function isClient(req, res, next) {
  const authorizationHeaader = req.headers.authorization;

  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token, {
      complete: true,
    });

    if (!decodedToken) {
      res.send("unable to decode token");
    }
    let userRole = decodedToken.payload.role;
    console.log(userRole);
    if (userRole === "client") {
      next();
    } else {
      res.status(403).send({ error: "Not Authorised", status: 403 });
    }
  }
}

export { authentication, isAdmin, isClient };
