import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const databaseName = process.env.MONGODB_DB || "arrive";

let client;
let database;

export async function connectDatabase() {
  if (database) {
    return database;
  }

  client = new MongoClient(uri);
  await client.connect();
  database = client.db(databaseName);

  await database.collection("users").createIndex({ email: 1 }, { unique: true });
  await database.collection("bookings").createIndex({ email: 1 });
  await database.collection("bookings").createIndex({ createdAt: -1 });

  return database;
}

export function getDatabase() {
  if (!database) {
    throw new Error("Database has not been connected.");
  }

  return database;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = undefined;
    database = undefined;
  }
}
