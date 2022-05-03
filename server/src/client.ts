import { PrismaClient } from "@prisma/client";
import { Password } from "./helpers";

const prismaClient = new PrismaClient({
  log: [
    { level: "error", emit: "event" },
    { level: "query", emit: "event" },
  ],
  errorFormat: "pretty",
});

export const prisma = prismaClient;
