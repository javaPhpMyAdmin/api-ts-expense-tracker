import { NextFunction, Request, Response } from "express";
import { Logger } from "../../domain/logger";

export class LoggerMiddleware {
  constructor(private readonly logger: Logger) {}

  public logRequest(req: Request, res: Response, next: NextFunction) {
    this.writeLog(req);
    next();
  }

  private writeLog(req: Request) {
    const customMessage = `[REQUEST] - ENDPOINT: ${req.originalUrl} - IP_ORIGIN_REQUEST: ${req.ip}`;
    this.logger.info(customMessage);
  }
}
