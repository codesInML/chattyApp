import app from "./app";
import { prisma } from "./client";
import Logger from "./logger";
import { Server } from "socket.io";
import { createServer } from "http";
import { version } from "../package.json";
import { socket } from "./socket";
const PORT = process.env.PORT || 3000;

// start the express app
const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT must be defined");
  }
  try {
    await prisma.$connect();
    Logger.info("Connected to Database");
    const httpServer = createServer(app);

    const io = new Server(httpServer, {
      cors: { origin: "http://localhost:3000", credentials: true },
    });

    httpServer.listen(PORT, () => {
      Logger.info(
        `Server started on port ${PORT} with version ${version} 🔥🔥🔥`
      );
      socket({ io });
    });
  } catch (err) {
    Logger.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
