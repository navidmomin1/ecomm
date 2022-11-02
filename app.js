import dotenv from "dotenv";
dotenv.config();
import express from "express";
import fetch from "node-fetch";
import {
  disableProductAvailability,
  index,
  search,
  createStore,
} from "./src/product.js";
import { ApolloServer, gql } from "apollo-server-express";
const app = express();

const port = 4800;
const baseURL = `localhost:4800`;
const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      products: [Products]
    }
    type Products {
      result: String!
      status: String!
    }
  `,
  resolvers: {
    Query: {
      products: () => {
        return fetch(`${baseURL}/products/availability/disable`).then((res) =>
          res.json()
        );
      },
    },
  },
});

await server.start();
server.applyMiddleware({ app });

app.use(express.json({ extended: false }));

app.post("/products/index", (req, res) => {
  index(req, res);
});

app.get("/products/search", (req, res, next) => {
  search(req, res, next);
});

app.put("/products/availability/disable", (req, res, next) => {
  disableProductAvailability(req, res, next);
});

app.post("/stores", (req, res, next) => {
  createStore(req, res, next);
});

app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("Server is up and running & listening");
  }
});
