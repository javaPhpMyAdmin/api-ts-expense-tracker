import { Request, Response } from "express";
import { LoginUserDto, RegisterUserDto } from "../domain/dtos";
import {
  LoginUserUseCase,
  LogoutUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
} from "../aplication/useCases";
import { CustomError, ErrorMessages } from "../../../shared/domain";
import { MakeCookie } from "../utils";
import { GoogleLoginUseCase } from "../aplication/useCases/googleLogin";

export class AuthController {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly googleLoginUseCase: GoogleLoginUseCase,
    private readonly logoutUseCase: LogoutUserUseCase
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
        const customRes = MakeCookie.create(req, res, response?.refreshToken!);
        res.json({
          status: "ok",
          user: response?.userRegistered,
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  loginUser(req: Request, res: Response) {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).send({ error });

    this.loginUserUseCase
      .run(loginUserDto!)
      .then((response) => {
        if (!response?.userAuthenticated)
          return res.status(401).json({
            error: CustomError.unauthorized(ErrorMessages.UNAUTHORIZED),
          });

        const customRes = MakeCookie.create(req, res, response?.refreshToken!);
        customRes.status(200).json({
          status: "ok",
          user: response?.userAuthenticated,
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  googleAuthUser(req: Request, res: Response) {
    const googleToken = req.body.token;

    if (!googleToken)
      return res
        .status(401)
        .json({ error: "No token for googleAuth provided" });

    this.googleLoginUseCase
      .run(googleToken)
      .then((response) => {
        if (!response?.user)
          return res.status(401).json({
            error: CustomError.unauthorized(ErrorMessages.UNAUTHORIZED),
          });

        const customRes = MakeCookie.create(req, res, response?.refreshToken!);
        customRes.status(200).json({
          status: "ok",
          user: response?.user,
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  refreshToken(req: Request, res: Response) {
    const userSession = req.cookies.userSession;
    if (!userSession) return res.status(204);

    this.refreshTokenUseCase
      .run(userSession)
      .then((response) => {
        if (!response?.refreshToken || !response)
          return res.status(401).json({
            error: CustomError.unauthorized(ErrorMessages.UNAUTHORIZED),
          });

        const customRes = MakeCookie.create(req, res, response?.refreshToken);
        customRes.status(200).json({
          message: "Token has been refreshed",
          token: response?.refreshToken,
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  logout(req: Request, res: Response) {
    const userSession = req.cookies.userSession;

    if (userSession === undefined)
      return res.status(204).json({ error: "There is not cookies to clear" });

    //JUST IN CASE IF I WANNA SAVE SOMETHING FROM SESSION IN THE DB THAT IS THE REASON FOR THE LOGOUT USE CASE
    const customResponse = this.logoutUseCase.run(res);

    customResponse
      .status(201)
      .json({ status: "ok", message: "Cookie cleared" });
  }
}
