import { Response, Request } from "express";
import { UserDto, UserEmailDto } from "../domain/dtos";
import { CustomError, Logger } from "../../../shared/domain";
import {
  DeleteUser,
  GetAllUsers,
  GetUserByEmail,
  UpdateUser,
  UploadProfileImage,
} from "../aplication/useCases";

export class UserController {
  constructor(
    private readonly uploadProfileImageUseCase: UploadProfileImage,
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

  logoutUser(req: Request, res: Response) {}

  getUserByEmail(req: Request, res: Response) {
    const email = req.params.email;

    const [error, emailDto] = UserEmailDto.execute(email);
    if (error) res.status(400).send(error);

    return res.status(200).send({ user: "User Retrieved", email });
  }

  updateUser(req: Request, res: Response) {
    const [error, userDto] = UserDto.create(req.body);

    if (error) res.status(400).send({ error: error });

    const userId = "1"; //AFTER USER A MIDDLEWARE WE COULD GET USER ID FROM req.user.userId
    this.updateUserUseCase
      .updateUser(userDto!, userId)
      .then((user) => res.status(200).json(user))
      .catch((e) => {
        this.handleError(e, res);
      });
  }

  deleteUser(req: Request, res: Response) {
    const userId = "1"; //AFTER USER A MIDDLEWARE WE COULD GET USER ID FROM req.user.userId

    this.deleteUserUseCase
      .deleteUser(userId)
      .then((user) => res.status(200).json(user))
      .catch((e) => {
        this.handleError(e, res);
      });
  }

  getAllUsers(req: Request, res: Response) {
    this.getAllUsersUseCase
      .getAllUser()
      .then((users) => res.status(200).json(users))
      .catch((e) => {
        this.handleError(e, res);
      });
  }

  uploadImageProfile(req: Request, res: Response) {
    const userId = req.body.user.id;
    const imageProfile = req.file;

    this.uploadProfileImageUseCase
      .run(imageProfile, userId)
      .then((response) => res.status(200).json(response))
      .catch((e) => {
        this.handleError(e, res);
      });
  }
}
