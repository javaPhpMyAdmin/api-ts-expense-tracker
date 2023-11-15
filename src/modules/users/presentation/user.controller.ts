import { Response, Request } from "express";
import { UserDto, UserLoginDto } from "../domain/dtos";
import { CustomError, Logger } from "../../../shared/domain";
import {
  DeleteUser,
  GetAllUsers,
  GetUserByEmail,
  RegisterUser,
  UpdateUser,
  UserLogin,
} from "../aplication/useCases";

export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUser,
    private readonly loginUserUseCase: UserLogin,
    private readonly getAllUsersUseCase: GetAllUsers,
    private readonly getUserByEmailUseCase: GetUserByEmail,
    private readonly updateUserUseCase: UpdateUser,
    private readonly deleteUserUseCase: DeleteUser,
    private readonly logger: Logger
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      this.logger.error(error.message);
      return res.status(error.statusCode).json({
        message: error.message,
      });
    } else {
      this.logger.error(String(error));

      res.status(500).json(CustomError.internalServer());
    }
  };

  registerUser(req: Request, res: Response) {
    const [error, userDto] = UserDto.create(req.body);

    if (error) return res.status(400).send({ error: error });

    this.registerUserUseCase
      .registerUser(userDto!)
      .then((user) => res.status(204).json(user!))
      .catch((e) => this.handleError(e, res));
  }

  loginUser(req: Request, res: Response) {
    const [error, userLoginDto] = UserLoginDto.create(req.body);

    if (error) res.status(400).send({ error: error });

    this.loginUserUseCase
      .loginUser(userLoginDto!)
      .then((user) => res.status(200).json(user))
      .catch((e) => {
        this.handleError(e, res);
      });
  }

  logoutUser(req: Request, res: Response) {}

  getUserByEmail(req: Request, res: Response) {
    return res.status(200).send({ user: "User Retrieved" });
  }

  updateUser(req: Request, res: Response) {
    const [error, userDto] = UserDto.create(req.body);

    if (error) res.status(400).send({ error: error });

    this.updateUserUseCase
      .updateUser(userDto!)
      .then((user) => res.status(200).json(user))
      .catch((e) => {
        this.handleError(e, res);
      });
  }

  deleteUser(req: Request, res: Response) {
    return res.status(200).send({ user: "User Deleted" });
  }

  getAllUsers(req: Request, res: Response) {
    return res
      .status(200)
      .send({ users: "Users Retrieved", user: req.body.user });
  }
}
