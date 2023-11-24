import { CustomError, ErrorMessages } from "../../../../shared/domain";
import { NextFunction, Request, Response } from "express";
import {
  ValidateTokenUseCase,
  GetUserByEmail,
} from "../../../../modules/auth/aplication/useCases";
import { AuthUtility } from "../../../../modules/auth/utils";
import { UserEmailDto } from "../../../../modules/users/domain";
import { UserToMiddleware } from "../mappers";

export class AuthMiddleware {
  constructor(
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly authUtility: AuthUtility,
    private readonly getUser: GetUserByEmail
  ) {}

  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.userSession;

    try {
      const payload = await this.validateTokenUseCase.verify(token);

      if (!payload)
        return res.status(403).json({
          error: CustomError.forbidden(`${ErrorMessages.FORBIDDEN} 2023`),
        });

      const [error, emailDto] = UserEmailDto.execute(payload?.userEmail)!;

      if (error)
        return res
          .status(400)
          .json({ error: CustomError.badRequest(ErrorMessages.BAD_REQUEST) });

      const user = await this.getUser.execute(emailDto?.email!);

      if (!user)
        return res.status(401).json({
          error: CustomError.unauthorized(`${ErrorMessages.UNAUTHORIZED} 2023`),
        });

      //AQUI PODRIA AL OBTENER EL USER JUGAR CON ALGUNA PROPIEDAD PARA INVALIDAR SU TOKEN

      const userToReq = UserToMiddleware.create(user);
      req.body.user = userToReq;

      next();
    } catch (error) {
      res.status(500).json({ error: CustomError.internalServer() });
    }
  };

  validateHeaders = async (req: Request, res: Response, next: NextFunction) => {
    const [errorSession, userSession] = this.authUtility.validateHeaders(req);

    if (errorSession)
      return res.status(401).json({
        error: CustomError.unauthorized(
          `${ErrorMessages.UNAUTHORIZED}, ${errorSession}`
        ),
      });

    if (!userSession)
      return res.status(401).json({
        error: CustomError.unauthorized(ErrorMessages.NOT_COOKIE_PROVIDED),
      });

    next();
  };
}
