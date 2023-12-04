import { Request, Response } from 'express';
import { LoginUserDto, RegisterUserDto } from '../domain/dtos';
import {
  LoginUserUseCase,
  LogoutUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
} from '../aplication/useCases';
import { CustomError, ErrorMessages } from '../../../shared/domain';
import { MakeCookie } from '../utils';
import { GoogleLoginUseCase } from '../aplication/useCases/googleLogin';
import '../utils/passport.util';
import passportGoogle from 'passport-google-oauth20';
import { envs } from '../../../shared/infrastructure/envs';
import passport from 'passport';

const GoogleStrategy = passportGoogle.Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: envs.GOOGLE_CLIENT_ID,
      clientSecret: envs.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5001/api/v1/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      return cb(null, profile);
    }
  )
);
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
          status: 'ok',
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
          status: 'ok',
          user: response?.userAuthenticated,
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  googleCallback(req: Request, res: Response) {
    passport.authenticate('google', (req: Request, res: Response) => {
      res.status(200).json({ message: 'user google authenticated' });
    });
    console.log('CALL BACK AFTER LOGIN USING GOOGLE');
  }

  googleAuthUser(req: Request, res: Response) {
    const googleToken =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU0YWRmYjQzNmI5ZTE5N2UyZTExMDZhZjJjODQyMjg0ZTQ5ODZhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NDgyODQxMTc5Nzctb2g3ODU3MTF1YzQxMDU3dDB1bnFsOWlvZGVsdDJqZmkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NDgyODQxMTc5Nzctb2g3ODU3MTF1YzQxMDU3dDB1bnFsOWlvZGVsdDJqZmkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDkxMzc2NzIyNzA4MTYwODE4ODMiLCJlbWFpbCI6ImNoZWxvYmF0MTY0MTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcwMTY1NDQ3NCwibmFtZSI6Ik1hcmNlbG8gQmF0aXN0YSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJZ2dDTThhUDVpbDZYN3NEZEd1VjI0TUx6Z18wcGJSck16a2JtbE1wd3lIdDg9czk2LWMiLCJnaXZlbl9uYW1lIjoiTWFyY2VsbyIsImZhbWlseV9uYW1lIjoiQmF0aXN0YSIsImxvY2FsZSI6ImVzIiwiaWF0IjoxNzAxNjU0Nzc0LCJleHAiOjE3MDE2NTgzNzQsImp0aSI6IjBkNzgwZThhNThkZDZkOTA1ODk4YTdiN2NhNjY2MmI3NmQ1ZmNjYzIifQ.G5bEPWvFm_jGVydXE8GxmdtrfTcmsV6pmLXE38-8rp732DSSIHq__uMIBpGO3j-cNLAbSOCZs4T40XS-Qw07uKU3RUaE4z3xU6jQwLkDr2j9OJnwOIgbVaJU12OMx28Sne4h8ft9d10oUF9O6xpfEZ7-w8JQ5TGjb5n8lD-ZCsBbSw9zjxbjK904qNmHzJB-X2oUGOM3_SYaYNKwhQJ5vlEDv18lCnrvUHgeX5k9jA1IyWR0jiOaAA15DYyxZSAeOXNdYnz5G2EYYAVjLIRDLE7fnm_3dRxH0OwHqnJM4JI1Mf06Rh1Lr3JNsYMpO5uQQIAxTsk2JP7nD0DAVgH7hQ';
    // if (!googleToken)
    //   return res
    //     .status(401)
    //     .json({ error: 'No token for googleAuth provided' });
    this.googleLoginUseCase
      .run(googleToken)
      .then((response) => {
        if (!response?.user)
          return res.status(401).json({
            error: CustomError.unauthorized(ErrorMessages.UNAUTHORIZED),
          });
        const customRes = MakeCookie.create(req, res, response?.refreshToken!);
        customRes.status(200).json({
          status: 'ok',
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
          message: 'Token has been refreshed',
          token: response?.refreshToken,
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  logout(req: Request, res: Response) {
    const userSession = req.cookies.userSession;

    if (userSession === undefined)
      return res.status(204).json({ error: 'There is not cookies to clear' });

    //JUST IN CASE IF I WANNA SAVE SOMETHING FROM SESSION IN THE DB THAT IS THE REASON FOR THE LOGOUT USE CASE
    const customResponse = this.logoutUseCase.run(res);

    customResponse
      .status(201)
      .json({ status: 'ok', message: 'Cookie cleared' });
  }
}
