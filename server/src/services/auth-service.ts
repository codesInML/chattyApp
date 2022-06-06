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

export const setAvatarService = async (
  id: string,
  image: string
): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data: { avatar: image, isAvatarSet: true },
  });
};

export const getAllUsersService = async (
  id: string
): Promise<ReturnedUser[]> => {
  const users: ReturnedUser[] = await prisma.user.findMany({
    where: {
      NOT: {
        id,
      },
    },
  });

  return users.map((user): ReturnedUser => {
    delete user.password;
    return user;
  });
};
export const getUserService = async (
  id: string
): Promise<ReturnedUser | null> => {
  const user: ReturnedUser | null = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (user) delete user.password;
  return user;
};
