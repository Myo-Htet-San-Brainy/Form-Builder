import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!; // Store this in your .env file
const options = {};

let client: MongoClient;

// Extend the global type to include _mongoClientPromise
declare global {
  var _mongoClient: MongoClient | undefined;
}

if (!global._mongoClient) {
  client = new MongoClient(uri, options);
  global._mongoClient = client;
}

client = global._mongoClient;

export default client;
