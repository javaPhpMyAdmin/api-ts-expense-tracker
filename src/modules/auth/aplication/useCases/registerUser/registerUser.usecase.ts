import {
  User,
  UserEmailDto,
  UserRepository,
} from "../../../../../modules/users/domain";
import { CustomError } from "../../../../../shared/domain";
import { Logger } from "../../../../../shared/domain/logger";
import { RegisterUserDto } from "../../../../../modules/auth/domain/dtos";
import { AuthRepository, AuthUtility } from "../../..";

const useCase = "[Use case - RegisterUser]";
export class RegisterUserUseCase {
  constructor(
    private readonly authUtility: AuthUtility,
    private readonly authRepository: AuthRepository,
    private readonly logger: Logger
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<
    | {
        userRegistered: User;
        accessToken: string | null;
        refreshToken: string | null;
      }
    | undefined
  > {
    this.logger.info(`${useCase} - AUTH REGISTERING USER...`);
    try {
      const userRegistered = await this.authRepository.saveUser(
        registerUserDto
      );
      //IF USER WAS NOT REGISTERED SUCCESSFULLY RETURN UNDEFINED
      if (!userRegistered) return undefined;

      if (userRegistered) {
        const accessToken = await this.authUtility.generateToken({
          userId: userRegistered.getId,
          userEmail: userRegistered.getEmail,
          userName: userRegistered.getName,
        });

        const refreshToken = await this.authUtility.generateRefreshToken({
          userId: userRegistered.getId,
          userEmail: userRegistered.getEmail,
          userName: userRegistered.getName,
        });

        // await this.authRepository.saveToken(
        //   userAuthenticated.getEmail,
        //   accessToken!
        // );

        this.logger.info(`${useCase} - USER REGISTERED SUCCESSFULLY`);
        return { userRegistered, accessToken, refreshToken: null };
      }
    } catch (error) {
      this.logger.error(`${useCase} - ERROR REGISTERING USER, ${error}`);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
