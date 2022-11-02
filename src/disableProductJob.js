import { produce } from "./producer.js";
const emitDisableProductEvent = async () => {
  let co = 0;
  for (let i = 0; i < 20000; i++) {
    const productId = getRandomArbitrary(0, 20000);
    const messagePayload = {
      topic: "products",
      messages: [
        {
          eventName: "disableProduct",
          productId,
        },
      ],
    };
    co++;
    await produce(JSON.stringify(messagePayload));
  }
  console.log(JSON.stringify(co));
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export { emitDisableProductEvent };
