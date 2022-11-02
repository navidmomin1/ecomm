import { produce } from "./producer.js";
import { generateLatLong } from "./generateLatLong.js";

const emitcreateStoreEvent = async (lat, long) => {
  let co = 0;
  for (let i = 0; i < 100; i++) {
    const { nextLat, nextLong } = await generateLatLong(lat, long);
    const messagePayload = {
      topic: "stores",
      messages: [
        {
          eventName: "createStore",
          nextLat,
          nextLong,
        },
      ],
    };
    co++;
    await produce(JSON.stringify(messagePayload));
  }
  console.log(JSON.stringify(co));
};

export { emitcreateStoreEvent };
