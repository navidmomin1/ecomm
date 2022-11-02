import { Kafka } from "kafkajs";
import { Client } from "@elastic/elasticsearch";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

await consumer.connect();
await consumer.subscribe({ topic: "stores", fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    });
    const client = new Client({ node: "http://localhost:9200" });
    const { distance } = req.body;
    const lat = JSON.parse(message).messages[0].lat;
    const long = JSON.parse(message).messages[0].long;
    const { body } = await client.index({
      index: "stores",
      id: co,
      body: {
        name: ```store - ${co}```,
        lat,
        long,
      },
    });
    for (let i = 0; i < 400; i++) {
      const { body } = await client.index({
        index: "products",
        id: co,
        body: {
          store: ```store - ${co}```,
          name: ```product - ${i} for store ${co}```,
          availability: true,
          price: 10,
          qtn: 1,
          pin: {
            location: {
              lat,
              long,
            },
          },
        },
      });
    }
    await client.indices.refresh({ index: "stores" });
    console.log(```store(s) created ${message}```);
  },
});
