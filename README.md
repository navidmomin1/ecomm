**Tools required**

1. MongoDB
2. nodejs
3. elasticsearch (check whether open my shared postman collection and run to check whether postman is running, response should have this -> "tagline": "You Know, for Search")
4. postman

I am sharing postman collection, which is ready to use.

**Steps**

1. start the grocery server, using `npm run dev` or `npm run start`
2. first use user registration API and create some users
3. then use login API endpoint, to get token, copy this token. Note -> tokens are valid for 1 day for simplicity reasons
4. now copy then token and open products API endpoint, goto Authorisation, and select the type bearer token and paste value in token field
5. now goto body section and select the file, Note -> I will be sending the sample csv file as well for ease of use over email
6. once you have set authorisation and body now hit the send button, if there is any duplicate entry appropriate error will come, in the csv if there is any new entry that will get inserted, if all are fresh/new, entire data will be inserted and appropriate message will come in response
7. do the authorisation step, goto body change if required and hit send button, appropriate message will come in result/response
8. if your elasticsearch is up and running, now is the time to index some documents, goto postman, and open elasticsearch index document, and hit send button, it will index some documents for searching
9. now go to search API endpoint in postman, do the authorisation step, it is common for all, goto body and change searchText if required, or else hit send button, results will be displayed in response. Note -> for search use term oil or rice, you might see change in search response.

**Note important**

1. if you get not authorise error which means you are not authorise to perform the operation, login again with appropriate user whose role should have access to perform the desired operations. for example only admin user can add products.
2. validity of token is 1 day for simplicity reasons
3. There are more strong authentication implementations using access, id and refresh token but simple bearer token is for simplicity
