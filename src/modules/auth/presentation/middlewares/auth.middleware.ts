import { CustomError } from "../../../../shared/domain";
import { NextFunction, Request, Response } from "express";
import {
  ValidateTokenUseCase,
  GetUserByEmail,
  ValidateTokenProps,
} from "../../../../modules/auth/aplication/useCases";
import { AuthUtility } from "../../../../modules/auth/utils";
import { UserEmailDto } from "../../../../modules/users/domain";

export class AuthMiddleware {
  constructor(
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly authUtility: AuthUtility | undefined,
    private readonly getUser: GetUserByEmail
  ) {}

  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const [errorHeader, errorToken, token] =
      this.authUtility?.validateHeaders(req)!;

    if (errorToken)
      return res.status(401).json(CustomError.unauthorized(errorToken));

    if (errorHeader)
      return res.status(401).json(CustomError.unauthorized(errorHeader));

    try {
      const payload = await this.validateTokenUseCase.verify(token!);

      if (!payload)
        return res
          .status(401)
          .json(CustomError.unauthorized("Invalid token provided"));

      const [error, emailDto] = UserEmailDto.execute(payload?.email)!;

      if (error) return res.status(400).json(CustomError.badRequest(error));

      const user = await this.getUser.execute(emailDto!);

      if (!user)
        return res
          .status(401)
          .json(CustomError.unauthorized("Invalid credentials"));

      //AQUI PODRIA AL OBTENER EL USER JUGAR CON ALGUNA PROPIEDAD PARA INVALIDAR SU TOKEN

      req.body.user = user;

      next();
    } catch (error) {
      console.log("ERROR AUTH MIDDLEWARE ERROR", error);

      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  };
}
