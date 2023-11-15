import { CustomError } from "../../../../shared/domain";
import { NextFunction, Request, Response } from "express";
import {
  ValidateToken,
  GetUserByEmail,
} from "../../../../modules/auth/aplication/useCases";
import { AuthUtility } from "../../../../modules/auth/utils";
import { UserEmailDto } from "../../../../modules/users/domain";

export class AuthMiddleware {
  constructor(
    private readonly authUseCase: ValidateToken,
    private readonly authUtility: AuthUtility,
    private readonly getUserUseCase: GetUserByEmail
  ) {}

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const [errorHeader, errorToken, accessToken] =
      this.authUtility.validateHeaders(req);

    if (errorToken)
      return res
        .status(401)
        .json(CustomError.unauthorized("Missing access token"));

    if (errorHeader)
      return res
        .status(401)
        .json(CustomError.unauthorized("Invalid Bearer token provided"));

    try {
      const payload = await this.authUseCase.verify(accessToken!);

      if (!payload)
        return res
          .status(401)
          .json(CustomError.unauthorized("Invalid token provided"));

      const [error, emailDto] = UserEmailDto.create(payload.email);

      if (error) return res.status(400).json(CustomError.badRequest(error));

      const user = await this.getUserUseCase.execute(emailDto!);

      //AQUI PODRIA AL OBTENER EL USER JUGAR CON ALGUNA PROPIEDAD PARA INVALIDAR SU TOKEN

      req.body.user = user;

      next();
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
