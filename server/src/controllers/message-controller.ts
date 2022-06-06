import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../helpers";
import { createMessageService, getMessagesService } from "../services";

export const createMessageController = async (req: Request, res: Response) => {
  const { from, to, message } = req.body;
  const data = await createMessageService({ from, to, message });
  return successResponse(req, res, StatusCodes.OK, data);
};

export const getMessagesController = async (req: Request, res: Response) => {
  const { to } = req.params;
  const from = req.currentUser?.id;
  const data = await getMessagesService(from!, to);

  const cleanData = data.map((msg) => {
    return {
      fromSelf: msg.sender === from,
      message: msg.message,
    };
  });
  return successResponse(req, res, StatusCodes.OK, cleanData);
};
