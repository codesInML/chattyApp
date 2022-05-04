import { prisma } from "../client";
import { User } from "@prisma/client";

interface UserData extends Omit<User, "id" | "isAvatarSet" | "avatar"> {}

export const createUser = async (data: UserData): Promise<User> => {
  return await prisma.user.create({
    data,
  });
};
