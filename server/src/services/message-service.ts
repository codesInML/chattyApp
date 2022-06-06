import { prisma } from "../client";
import { Message } from "@prisma/client";

export interface MessagePayload {
  from: string;
  to: string;
  message: string;
}

export const createMessageService = async (
  payload: MessagePayload
): Promise<Message> => {
  return await prisma.message.create({
    data: {
      message: payload.message,
      users: [payload.from, payload.to],
      user: { connect: { id: payload.from } },
    },
  });
};

export const getMessagesService = async (
  from: string,
  to: string
): Promise<Message[]> => {
  return await prisma.message.findMany({
    where: { users: { hasEvery: [from, to] } },
  });
};
