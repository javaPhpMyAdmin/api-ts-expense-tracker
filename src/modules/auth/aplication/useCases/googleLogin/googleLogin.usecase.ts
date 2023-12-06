import {
  AuthRepository,
  AuthUtility,
  GoogleAuth,
  GoogleRegisterDto,
} from '../../..';
import { CustomError } from '../../../../../shared/domain';
import { ConsoleLogger } from '../../../../../shared/infrastructure';
import { User } from '../../../../users/domain';

const useCase = '[USE CASE - GoogleLoginUser]';

export class GoogleLoginUseCase {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly authRepository: AuthRepository,
    private readonly authUtility: AuthUtility
  ) {}

  async run(
    googleToken: string
  ): Promise<{ user: User | null; refreshToken: string | null } | null> {
    try {
      const ticket = await GoogleAuth.verifyToken(googleToken);

      const payload = GoogleAuth.getPayload(ticket);

      console.log('====== PAYLOAD FROM GOOGLE AUTHENTICATION ======', payload);
      //VERIFY IF THERE IS A USER IN THE DB
      let user = await this.authRepository.getUser(payload?.email!);

      // //IF NO EXIST A USER WITH THIS EMAIL, CREATE A NEW USER AND RETURN IT
      if (!user) {
        const [error, registerUserDto] = GoogleRegisterDto.create({
          email: payload?.email,
          name: payload?.name,
          lastname: payload?.family_name,
          imageProfile: payload?.picture,
        });

        console.log('REGISTERED USER DTO', registerUserDto);
        if (error) throw CustomError.badRequest(error);

        user = await this.authRepository.saveUser(registerUserDto!);
      }
      console.log('USER RETRIEVED ', user);
      if (!user) return null;

      const refreshToken = await this.authUtility.generateRefreshToken({
        userId: user?.getId,
        userEmail: user?.getEmail,
        userName: user?.getName,
      });
      console.log('REFRESH TOKEN', refreshToken);
      this.logger.info(`${useCase} - USER LOGGED SUCCESSFULLY...`);
      return { user: null, refreshToken: null };
    } catch (error) {
      this.logger.error(
        `${useCase}  ===== ERROR GOOGLE LOGIN USE CASE ===== ${error}`
      );

      if (error instanceof CustomError) {
        this.logger.error(
          `${useCase} ===== ERROR GOOGLE LOGIN USE CASE ===== ${error.message}`
        );
        throw error;
      }
      throw CustomError.internalServer('GOOGLE LOGIN USER USE CASE');
    }
  }
}
