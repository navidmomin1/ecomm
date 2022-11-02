import { Kafka } from "kafkajs";
import { Client } from "@elastic/elasticsearch";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

await consumer.connect();
await consumer.subscribe({ topic: "products", fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    });
    const client = new Client({ node: "http://localhost:9200" });
    const { distance } = req.body;
    const id = JSON.parse(message).messages[0].productId;
    const { body } = await client.update({
      index: "products",
      id: id,
      body: {
        doc: {
          isAvailable: false,
        },
      },
    });
    await client.indices.refresh({ index: "products" });
    console.log(```product disabled ${message}```);
  },
});
