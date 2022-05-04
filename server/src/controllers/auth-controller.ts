import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { generateJWT, successResponse } from "../helpers";
import { BadRequestError } from "../errors";
import { createUser } from "../services";

// @desc    Login Users
// @route   POST    /api/v1/auth/signin
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

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

  const data = await createUser({ fullName, email, password });

  // // Generate the JWT and attach it to the req session object
  // generateJWT(req, { id: data.id, email: data.email, type: data.type });

  return successResponse(req, res, StatusCodes.CREATED, data);
};
