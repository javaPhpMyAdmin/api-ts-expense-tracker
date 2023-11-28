import {
  AuthRepository,
  AuthUtility,
  GoogleAuth,
  GoogleRegisterDto,
} from '../../..';
import { CustomError } from '../../../../../shared/domain';
import { ConsoleLogger } from '../../../../../shared/infrastructure';
import { User } from '../../../../users/domain';

const useCase = '[Use case - GoogleLoginUser]';

export class GoogleLoginUseCase {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly authRepository: AuthRepository,
    private readonly authUtility: AuthUtility
  ) {}

  async run(
    googleToken: string
  ): Promise<{ user: User; refreshToken: string | null } | null> {
    try {
      const ticket = await GoogleAuth.verifyToken(googleToken);
      const payload = GoogleAuth.getPayload(ticket);

      console.log('====== PAYLOAD FROM GOOGLE AUTHENTICATION ======', payload);

      let user = await this.authRepository.getUser(payload?.email!);

      if (!user) {
        const lastname = payload?.name; //TODO: APPLY SOME LOGIC TO GET LASTNAME FROM NAME

        const [error, registerUserDto] = GoogleRegisterDto.create({
          email: payload?.email,
          name: payload?.name,
          lastname,
        });

        if (error) throw CustomError.badRequest(error);

        user = await this.authRepository.saveUser(registerUserDto!);
      }

      if (!user) return null;

      const refreshToken = await this.authUtility.generateRefreshToken({
        userId: user?.getId,
        userEmail: user?.getEmail,
        userName: user?.getName,
      });

      this.logger.info(`${useCase} - USER LOGGED SUCCESSFULLY...`);
      return { user, refreshToken };
    } catch (error) {
      if (error instanceof CustomError) {
        console.log('===== ERROR GOOGLE - LOGIN USE CASE =====', error);
        this.logger.error(`${useCase} - ${error.message}`);
        throw error;
      }
      throw CustomError.internalServer('GOOGLE LOGIN USER USE CASE');
    }
  }
}