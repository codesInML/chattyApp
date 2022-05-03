import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";

beforeAll(async () => {
  const mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
});
