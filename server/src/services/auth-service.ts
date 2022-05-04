import { prisma } from "../client";
import { User } from "@prisma/client";

interface UserData extends Omit<User, "id" | "createdAt" | "updatedAt"> {}
interface ReturnedUser extends Omit<User, "password"> {}

export const createUser = async (data: UserData): Promise<ReturnedUser> => {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      fullName: true,
      email: true,
      avatar: true,
      isAvatarSet: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findUser = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
