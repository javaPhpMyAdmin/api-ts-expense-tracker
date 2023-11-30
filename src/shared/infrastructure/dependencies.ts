//TODO: COULD EXPORT AN INSTANCE OF SENDEMAIL HERE

import { Request } from "express";
import { HTTPRouter } from "../presentation/http";
import {
  LoggerMiddleware,
  MulterMiddleware,
} from "../presentation/middlewares";
import { ConsoleLogger } from "./logger";
import { CloudinaryUtility } from "../utils";

//EXPORT A LOGGER INSTANCE
export const logger = new ConsoleLogger();
export const loggerMiddleware = new LoggerMiddleware(logger);
export const httpRouter = new HTTPRouter();
export const multerMiddleware = new MulterMiddleware();
export const cloudinaryUtility = new CloudinaryUtility();
