import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { generateJWT, Password, successResponse } from "../helpers";
import { BadRequestError } from "../errors";
import {
  createUser,
  findUser,
  getAllUsersService,
  getUserService,
  setAvatarService,
} from "../services";

// @desc    Login Users
// @route   POST    /api/v1/auth/signin
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await findUser(email);

  if (!user) throw new BadRequestError("Invalid credentials");

  const isPasswordMatch = await Password.comparePassword(
    password,
    user.password
  );

  if (!isPasswordMatch) throw new BadRequestError("Invalid credentials");

  generateJWT(req, { id: user.id, email: user.email });

  return successResponse(req, res, StatusCodes.OK);
};

// @desc    Sign Out Users
// @route   GET   /api/v1/auth/signout
export const signOutController = async (req: Request, res: Response) => {
  req.session = null;

  return successResponse(req, res, StatusCodes.OK);
};

// @desc    Register a user
// @route   POST    /api/v1/auth/register
export const registerUserController = async (req: Request, res: Response) => {
  const { fullName, email, password, avatar, isAvatarSet } = req.body;

  const data = await createUser({
    fullName,
    email,
    password,
    avatar,
    isAvatarSet,
  });

  // Generate the JWT and attach it to the req session object
  generateJWT(req, { id: data.id, email: data.email });

  return successResponse(req, res, StatusCodes.CREATED, data);
};

// @desc    Fetches the current user
// @route   GET   /api/v1/auth/current-user
export const currentUserController = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.status(StatusCodes.OK).json({ currentUser: null });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "success", currentUser: req.currentUser });
};

// TODO: Write tests for this
// @desc    Sets the user's avatar
// @route   Post   /api/v1/auth/set-avatar
export const setAvatarController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { image } = req.body;

  const updatedUser = await setAvatarService(id, image);

  return successResponse(req, res, StatusCodes.OK, updatedUser);
};

// TODO: Write tests for this
// @desc    Get all users
// @route   Get   /api/v1/auth/users
export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await getAllUsersService(req.currentUser?.id!);
  return successResponse(req, res, StatusCodes.OK, users);
};

// TODO: Write tests for this
// @desc    Get a particular user
// @route   Get   /api/v1/auth/user
export const getUserController = async (req: Request, res: Response) => {
  const user = await getUserService(req.currentUser?.id!);
  return successResponse(req, res, StatusCodes.OK, user);
};
