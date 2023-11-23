import { Request, Response } from 'express';
import { LoginUserDto, RegisterUserDto } from '../domain/dtos';
import {
  LoginUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
} from '../aplication/useCases';
import { CustomError } from '../../../shared/domain';

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
        handledError: 'Auth Controller',
      });
    } else {
      res.status(500).json(CustomError.internalServer());
    }
  };
  registerUser(req: Request, res: Response) {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).send({ error: error });

    this.registerUserUseCase
      .registerUser(registerUserDto!)
      .then(async (response) => {
        if (!response?.userRegistered)
          return res.status(403).json({
            error: 'IMPOSSIBLE TO REGISTER USER',
          });
        res.json({
          user: response?.userRegistered,
          token: response?.accessToken,
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
          return res.status(403).json({ error: 'INVALID CREDENTIALS' });

        res.status(200).json({
          user: response?.userAuthenticated,
          token: response?.accessToken,
          refreshToken: response?.refreshToken,
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  refreshToken(req: Request, res: Response) {
    const refreshToken = req.header('Refresh-Token');
    console.log(refreshToken);

    this.refreshTokenUseCase
      .execute(refreshToken!)
      .then((response) => {
        console.log('RESPONSE REFRESH TOKEN USE CASE', response);
      })
      .catch((e) => this.handleError(e, res));

    res.status(200).json({ message: 'Refresh token' });
  }
}
