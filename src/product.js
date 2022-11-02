import dotenv from "dotenv";
dotenv.config();

import { Client } from "@elastic/elasticsearch";
import { emitDisableProductEvent } from "./disableProductJob.js";
import { emitcreateStoreEvent } from "./createStoreJob.js";

async function search(req, res, next) {
  const client = new Client({ node: "http://localhost:9200" });
  const { distance } = req.body;
  const { body } = await client.search({
    index: "products",
    body: {
      query: {
        bool: {
          must: {
            match_all: {},
          },
          filter: {
            geo_distance: {
              distance,
              "pin.location": {
                lat: 25.2624954612389,
                lon: 55.30203457030534,
              },
            },
          },
        },
      },
    },
  });
  res.status(200).send({ result: body, status: 200 });
}

async function disableProductAvailability(req, res, next) {
  emitDisableProductEvent();
  res.status(200).send({
    result: "Backend processing for disabling product-store initaited",
    status: 200,
  });
}

async function createStore(req, res, next) {
  const { lat, long } = req.body;
  emitcreateStoreEvent(lat, long);
  res.status(200).send({
    result: "Backend processing for create store initaited",
    status: 200,
  });
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

export { search, index, disableProductAvailability, createStore };
