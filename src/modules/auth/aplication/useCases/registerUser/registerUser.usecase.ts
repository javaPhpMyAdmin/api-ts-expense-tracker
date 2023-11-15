import {
  User,
  UserEmailDto,
  UserRepository,
} from "../../../../../modules/users/domain";
import { CustomError } from "../../../../../shared/domain";
import { Logger } from "../../../../../shared/domain/logger";
import { RegisterUserDto } from "../../../../../modules/auth/domain/dtos";

const useCase = "[Use case - RegisterUser]";
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async registerUser(
    registerUserDto: RegisterUserDto
  ): Promise<User | undefined> {
    this.logger.info(`${useCase} - REGISTERING USER...`);
    try {
      const [error, email] = UserEmailDto.create(registerUserDto.emailDto);
      if (error) throw CustomError.badRequest(error);

      //CHECK IF USER IS NOT REGISTERED
      const existUser = await this.userRepository.getUserByEmail(email!);
      if (existUser) throw CustomError.badRequest("User already exist");

      //IF NOT REGISTERED THEN SAVE THE NEW USER
      const user = await this.userRepository.saveUser(registerUserDto);
      if (!user) {
        const error = new Error("Something went wrong trying to register user");
        throw error;
      }

      this.logger.info(`${useCase} - USER REGISTERED SUCCESSFULLY`);

      return user;
    } catch (error) {
      this.logger.error(`${useCase} - ERROR REGISTERING USER, ${error}`);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
