import { PrismaClient } from "@prisma/client";
import { Password } from "./helpers";

const prismaClient = new PrismaClient({
  log: [
    { level: "error", emit: "event" },
    { level: "query", emit: "event" },
  ],
  errorFormat: "pretty",
});

// intercept and hash passwords before save
prismaClient.$use(async (params, next) => {
  if (params.model == "User" && params.action == "create") {
    const hashedPassword = await Password.toHash(params.args.data.password);
    params.args["data"] = {
      ...params.args.data,
      password: hashedPassword,
    };
  }

  return next(params);
});

prismaClient.$on("error", (e) => console.log(e));

export const prisma = prismaClient;
