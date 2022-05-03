import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { generateJWT, Password, successResponse } from "../helpers";
import { BadRequestError } from "../errors";
import Logger from "../logger";

// @desc    Login Users
// @route   POST    /api/v1/auth/signin
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // const existingUser = await findUser(email);

  // // check if the user has both a buyer and seller account
  // if (Array.isArray(existingUser)) {
  //   // TODO: handle this issue appropriately
  //   return;
  // }

  // if (!existingUser) throw new BadRequestError("Invalid credentials");

  // const passwordMatch = await Password.comparePassword(
  //   password,
  //   existingUser.password
  // );

  // if (!passwordMatch) throw new BadRequestError("Invalid credentials");

  // // After providing valid credentials
  // // Generate the JWT and attach it to the req session object
  // generateJWT(req, {
  //   id: existingUser.id,
  //   email: existingUser.email,
  //   type: existingUser.type,
  // });

  return successResponse(req, res, StatusCodes.OK);
};

// @desc    Sign Out Users
// @route   GET   /api/v1/auth/signout
export const signOutController = async (req: Request, res: Response) => {
  // for normal jwt session
  req.session = null;

  return successResponse(req, res, StatusCodes.OK);
};

// @desc    Register a user
// @route   POST    /api/v1/auth/register
export const registerUserController = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  // const data = await createBuyer({ fullName, email, password });

  // // Generate the JWT and attach it to the req session object
  // generateJWT(req, { id: data.id, email: data.email, type: data.type });

  return successResponse(req, res, StatusCodes.CREATED);
};

// @desc    Fetches the current user
// @route   GET   /api/v1/auth/signin
export const currentUser = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ currentUser: null });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "success", currentUser: req.currentUser });
};
