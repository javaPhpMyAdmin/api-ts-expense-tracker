import { CustomError } from "../../../../shared/domain";
import { NextFunction, Request, Response } from "express";
import {
  ValidateTokenUseCase,
  GetUserByEmail,
  ValidateTokenProps,
} from "../../../../modules/auth/aplication/useCases";
import { AuthUtility } from "../../../../modules/auth/utils";
import { UserEmailDto } from "../../../../modules/users/domain";
const authUtil = new AuthUtility();
// const validateTokenUseCase = new ValidateTokenUseCase();
export class AuthMiddleware {
  constructor(
    private readonly validateTokenUse: ValidateTokenUseCase,
    private readonly authUtility: AuthUtility | undefined,
    private readonly getUserUseCase: GetUserByEmail
  ) {}

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const [errorHeader, errorToken, token] = authUtil.validateHeaders(req);

    if (errorToken)
      return res
        .status(401)
        .json(CustomError.unauthorized("Missing access token"));

    if (errorHeader)
      return res
        .status(401)
        .json(CustomError.unauthorized("Invalid Bearer token provided"));

    try {
      console.log("BEFORE AUTH CASE VERIFY", token);

      const payload = await this.validateTokenUse.verify(token!);

      if (!payload)
        return res
          .status(401)
          .json(CustomError.unauthorized("Invalid token provided"));

      console.log("PAYLOAD", payload);
      const [error, emailDto] = UserEmailDto.execute(payload?.email)!;

      if (error) return res.status(400).json(CustomError.badRequest(error));

      const user = await this.getUserUseCase.execute(emailDto!);

      if (!user)
        return res.status(401).json(CustomError.unauthorized("Invalid user"));

      //AQUI PODRIA AL OBTENER EL USER JUGAR CON ALGUNA PROPIEDAD PARA INVALIDAR SU TOKEN

      req.body.user = user;

      next();
    } catch (error) {
      console.log("ERROR VALIDATE TOKEN", error);

      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }
}
