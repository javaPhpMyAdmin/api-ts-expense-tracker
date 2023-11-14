import { CustomError } from "@/shared/domain";
import { NextFunction, Request, Response } from "express";
import { ValidateToken } from "modules/auth/aplication/useCases/validateToken/validateToken.usecase";

export class AuthMiddleware {
  constructor(private readonly authUseCase: ValidateToken) {}

  public validateToken(req: Request, res: Response, next: NextFunction) {
    const [error, token] = this.authUseCase.verify(req);

    if (error) return CustomError.badRequest(error);

    req.body.token = token;
    next();
  }
}
