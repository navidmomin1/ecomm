**Tools required**

1. nodejs
2. elasticsearch (open my shared postman collection and run to check whether elasticsearch is running, response should have this -> "tagline": "You Know, for Search")
3. postman
4. kafka

I am sharing postman collection, which is ready to use.

**Steps**

1. start the server, using `npm run dev` or `npm run start`
2. localhost:4800/products/search -> this API fetches all products under km passed by user in body
3. localhost:4800/products/availability/disable -> when user calls this API, it passes the control to a job (in async) and return the response. the job emits events to kafka, and kafka consumer reads the events and perform the disabling of products. Multiple consumer instance can be created for faster processing / throughput
4. localhost:4800/stores -> responsible for creating stores, it passes the control to a job (in async) and return the response to end user. the job emits events to kafka, and kafka consumer reads the events and perform the disabling of products. Multiple consumer instance can be created for faster processing / throughput

**Note important**

1. usually we dont send/checkin node_modules but i did it for simplicity reasons
