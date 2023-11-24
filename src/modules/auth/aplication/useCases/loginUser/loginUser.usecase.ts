import { LoginUserDto, User } from "../../../../../modules/users/domain";
import { CustomError, Logger } from "../../../../../shared/domain";
import { AuthUtility } from "../../../utils";
import { AuthRepository } from "../../..";

const useCase = "[Use case - LoginUser]";
export class LoginUserUseCase {
  constructor(
    private readonly authUtility: AuthUtility,
    private readonly authRepository: AuthRepository,
    private readonly logger: Logger
  ) {}

  async loginUser(loginUserDto: LoginUserDto): Promise<
    | {
        userAuthenticated: User;
        accessToken: string | null;
        refreshToken: string | null;
      }
    | undefined
  > {
    this.logger.info(`${useCase} - AUTH LOGING USER...`);
    try {
      const userAuthenticated = await this.authRepository.loginUser(
        loginUserDto
      );

      //IF USER SEND WRONG CREDENTIALS RETURN UNDEFINED
      if (!userAuthenticated) return undefined;

      if (userAuthenticated) {
        const accessToken = await this.authUtility.generateToken({
          userId: userAuthenticated?.getId,
          email: userAuthenticated?.getEmail,
          userName: userAuthenticated?.getName,
        });

        const refreshToken = await this.authUtility.generateRefreshToken({
          userId: userAuthenticated?.getId,
          userEmail: userAuthenticated?.getEmail,
          userName: userAuthenticated?.getName,
        });

        this.logger.info(`${useCase} - USER LOGGED SUCCESSFULLY...`);
        return { userAuthenticated, accessToken, refreshToken };
      }
    } catch (error) {
      if (error instanceof CustomError) {
        this.logger.error(`${useCase} - ${error.message}`);
        throw error;
      }
      throw CustomError.internalServer("LOGIN USER USE CASE");
    }
  }
}
