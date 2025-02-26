import { MongoClient, Db } from "mongodb";

let db: Db;

export const connectToDatabase = async (mongoUri: string): Promise<Db> => {
  if (db) return db;

  const client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db();
  console.log("Connected to MongoDB");
  return db;
};
