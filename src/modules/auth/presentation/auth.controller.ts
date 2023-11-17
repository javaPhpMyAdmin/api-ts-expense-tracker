import { NextFunction, Request, Response } from "express";
import { RegisterUserDto } from "../domain/dtos";
import { RegisterUserUseCase } from "../aplication/useCases";
import { CustomError } from "../../../shared/domain";
import { AuthUtility } from "..";

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly authUtility: AuthUtility
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        message: error.message,
        handledError: "Auth Controller",
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
      .then(async (user) => {
        res.json({
          user,
          token: await this.authUtility.generateToken({
            id: user?.getId,
            email: user?.getEmail,
            name: user?.getName,
          }),
        });
      })
      .catch((e) => this.handleError(e, res));
  }

  loginUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).send("LOGIN USER");
  }
}
