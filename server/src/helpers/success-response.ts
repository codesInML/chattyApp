import { Request, Response } from "express";
import Logger from "../logger";

export const successResponse = (
  req: Request,
  res: Response,
  statusCode: number,
  data?: any
) => {
  const requestMethod = req.method;
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  Logger.info(`${requestMethod}    ${fullUrl}`);
  return res.status(statusCode).json({
    message: "success",
    data,
  });
};
