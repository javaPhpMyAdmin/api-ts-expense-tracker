import { Request, Response } from "express";
import { LoginUserDto, RegisterUserDto } from "../domain/dtos";
import {
  LoginUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
} from "../aplication/useCases";
import { CustomError, ErrorMessages } from "../../../shared/domain";
import { MakeCookie } from "../utils";

export class AuthController {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: CustomError.internalServer(ErrorMessages.INTERVAL_SERVER),
      });
    }
  };

  registerUser(req: Request, res: Response) {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).send({ error: error });

    this.registerUserUseCase
      .registerUser(registerUserDto!)
      .then(async (response) => {
        if (!response?.userRegistered)
          return res.status(401).json({
            error: CustomError.unauthorized(
              ErrorMessages.IMPOSSIBLE_REGISTER_USER
            ),
          });
        res.json({
          user: response?.userRegistered,
          refreshToken: response?.refreshToken,
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  loginUser(req: Request, res: Response) {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).send({ error });

    this.loginUserUseCase
      .loginUser(loginUserDto!)
      .then((response) => {
        if (!response?.userAuthenticated)
          return res.status(401).json({
            error: CustomError.unauthorized(ErrorMessages.UNAUTHORIZED),
          });

        const customRes = MakeCookie.create(res, response?.refreshToken!);
        customRes.status(200).json({
          user: response?.userAuthenticated,
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  refreshToken(req: Request, res: Response) {
    const userSession = req.cookies.userSession;
    if (!userSession) return res.status(204);

    this.refreshTokenUseCase
      .execute(userSession)
      .then((response) => {
        if (!response?.refreshToken || !response)
          return res.status(401).json({
            error: CustomError.unauthorized(ErrorMessages.UNAUTHORIZED),
          });

        const customRes = MakeCookie.create(res, response?.refreshToken);
        customRes.status(200).json({
          message: "Token has been refreshed",
          token: response?.refreshToken,
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  logout(req: Request, res: Response) {
    const userSession = req.cookies.userSession;
    if (!userSession) return res.status(204);

    res.clearCookie("userSession", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "Cookie cleared" });
  }
}
