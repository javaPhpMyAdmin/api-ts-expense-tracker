import { CustomError, Logger } from '../../../../../shared/domain';
import { User, UserLoginDto, UserRepository } from '../../../domain';

const useCase = '[Use case - LoginUser]';
export class UserLogin {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async loginUser(
    userLogin: UserLoginDto
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    this.logger.info(`${useCase} - LOGING USER...`);
    try {
      const userAuthenticated = await this.userRepository.loginUser(userLogin);
      if (userAuthenticated) {
        const accessToken = ''; //get access token
        const refreshToken = ''; //generate refresh token

        await this.userRepository.saveRefreshToken(
          userAuthenticated.getEmail,
          accessToken
        );

        return { accessToken, refreshToken };
      }
      throw CustomError.badRequest('Invalid credentials');
    } catch (error) {
      if (error instanceof CustomError) {
        this.logger.error(`${useCase} - ${error.message}`);
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
