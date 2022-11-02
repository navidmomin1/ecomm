import { Kafka } from "kafkajs";
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
const producer = kafka.producer();
const produce = async (messagePayload) => {
  console.log(messagePayload);
  await producer.send(messagePayload);
};

await producer.connect();

export { produce };
