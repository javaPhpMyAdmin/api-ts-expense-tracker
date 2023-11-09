//TODO: COULD EXPORT AN INSTANCE OF SENDEMAIL HERE

import { LoggerMiddleware } from "../presentation/middlewares";
import { ConsoleLogger } from "./logger";

//EXPORT A LOGGER INSTANCE
export const logger = new ConsoleLogger();
export const loggerMiddleware = new LoggerMiddleware(logger);
