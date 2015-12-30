# Sails-Mongo sample application

This is a barebones application intended to demonstrate the use of the background-compute library to unblock the event loop in node.

## Setup

You need Node, MongoDb, and Sails installed to run this application. It is the basic vanilla sails app with two endpoints:

 * Users: to request documents from a MongoDb database
 * Ping: to test the health / response of the server
 
You should start with a blank database in mongo. There is a script in the /scripts folder that will seed the 'user'  collection with 100,000 randomly-generated users with first name and created date. I used the database name 'sails-mongo-test' (which you can change if you modify the connection in sails config), so creating the documents is pretty simple:

```bash
mongo localhost:27017/sails-mongo-test ./scripts/importUsers.js
```

After this, you can lift the application (after installing all node modules).

## Testing

There is a test client that makes one request to the /users endpoint and starts an interval of making a request to the /ping endpoint every 250 ms, to demonstrate the concept. 

Go to the /client folder and run the client.js file from node. It will log most activity to the console.

Here are some examples of the output of the client:

### Unblocked
```bash
GET /users
GET /ping
GET /ping responded with pong in 23 ms
GET /ping
GET /ping responded with pong in 24 ms
GET /ping
GET /ping responded with pong in 17 ms
GET /ping
GET /ping responded with pong in 12 ms
GET /ping
GET /ping responded with pong in 3 ms
GET /ping
GET /ping responded with pong in 3 ms
GET /ping
GET /ping responded with pong in 3 ms
GET /ping
GET /ping responded with pong in 3 ms
GET /ping
GET /ping responded with pong in 3 ms
GET /ping
GET /ping responded with pong in 4 ms
GET /ping
GET /ping responded with pong in 3 ms
GET /ping
GET /ping responded with pong in 3 ms
GET /users responded with 50 users in 3243 ms
```

### Blocked
```bash
GET /users
GET /ping
GET /ping responded with pong in 33 ms
GET /ping
GET /ping responded with pong in 12 ms
GET /ping
GET /ping responded with pong in 18 ms
GET /ping
GET /ping
GET /ping
GET /ping
GET /ping
GET /ping
GET /ping
GET /ping
GET /ping
GET /users responded with 50 users in 3018 ms
GET /ping responded with pong in 2028 ms
GET /ping responded with pong in 1778 ms
GET /ping responded with pong in 1528 ms
GET /ping responded with pong in 1277 ms
GET /ping responded with pong in 1026 ms
GET /ping responded with pong in 776 ms
GET /ping responded with pong in 525 ms
GET /ping responded with pong in 273 ms
GET /ping responded with pong in 22 ms
```

## Seeing the differences

Until these changes are merged, you will have to make the following changes to see the performance benefits:
* swap the sails/waterline node module for our fork: https://github.com/PetroCloud/waterline
* use our fork of sails-mongo (https://github.com/PetroCloud/sails-mongo) (this is done by default in the package.json)

Doing these changes will deliver results similar to those where the event loop is not blocked. To compare, restore the vanilla waterline module and use the default sails-mongo module and you will see results similar to the ones with the event loop blocked.
