import { prisma } from "../client";
import { User } from "@prisma/client";

interface UserData extends Omit<User, "id" | "createdAt" | "updatedAt"> {}
export type ReturnedUser = Partial<Pick<User, "password">> &
  Omit<User, "password">;

export const createUser = async (data: UserData): Promise<ReturnedUser> => {
  const user: ReturnedUser = await prisma.user.create({
    data,
  });
  delete user.password;

  return user;
};

export const findUser = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
