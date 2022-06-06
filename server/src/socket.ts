import { Server, Socket } from "socket.io";
import Logger from "./logger";
import { MessagePayload } from "./services";

enum EVENTS {
  connection = "connection",
  addUser = "add-user",
  sendMessage = "send-message",
  receiveMessage = "receive-message",
}

const onlineUsers = new Map();

export const socket = ({ io }: { io: Server }) => {
  Logger.info("Sockets enabled");

  io.on(EVENTS.connection, (socket: Socket) => {
    Logger.info(`User connected ${socket.id}`);

    socket.on(EVENTS.addUser, (userId: string) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on(EVENTS.sendMessage, (data: MessagePayload) => {
      const sendUserSocket = onlineUsers.get(data.to);

      if (sendUserSocket) {
        socket.to(sendUserSocket).emit(EVENTS.receiveMessage, data.message);
      }
    });
  });
};
