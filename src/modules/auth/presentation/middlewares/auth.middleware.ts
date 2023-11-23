import { CustomError } from "../../../../shared/domain";
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
    private readonly authUtility: AuthUtility | undefined,
    private readonly getUser: GetUserByEmail
  ) {}

  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["user-session"];
    console.log("validateToken", token);

    try {
      const payload = await this.validateTokenUseCase.verify(token);
      console.log("PAYLOAD AUTH MIDDLEWARE VALIDATE TOKEN", payload);

      if (!payload)
        return res
          .status(401)
          .json(CustomError.unauthorized("Invalid token provided"));

      const [error, emailDto] = UserEmailDto.execute(payload?.email)!;

      if (error) return res.status(400).json(CustomError.badRequest(error));

      const user = await this.getUser.execute(emailDto?.email!);

      if (!user)
        return res
          .status(401)
          .json(CustomError.unauthorized("Invalid credentials"));

      //AQUI PODRIA AL OBTENER EL USER JUGAR CON ALGUNA PROPIEDAD PARA INVALIDAR SU TOKEN

      const userToReq = UserToMiddleware.create(user);
      req.body.user = userToReq;

      next();
    } catch (error) {
      res.status(500).json({ error: CustomError.internalServer() });
    }
  };

  validateHeaders = async (req: Request, res: Response, next: NextFunction) => {
    const userCookie = req.cookies;
    const userSession = userCookie["user-session"];

    if (!userSession)
      return res.status(401).json({ error: "Not cookie provided" });

    next();
  };
}
