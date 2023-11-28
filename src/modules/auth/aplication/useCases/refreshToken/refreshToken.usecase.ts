import { AuthRepository, AuthUtility, ValidateTokenProps } from 'modules/auth';
import { CustomError } from '../../../../../shared/domain';
import { jwtDecode } from 'jwt-decode';

export class RefreshTokenUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authUtility: AuthUtility
  ) {}

  async run(refreshToken: string): Promise<{ refreshToken: string } | null> {
    try {
      //VERIFY REFRESH TOKEN
      const validRefreshToken =
        await this.authUtility.verifyRefreshToken<ValidateTokenProps>(
          refreshToken
        );

      if (!validRefreshToken) return null;

      const decoded: ValidateTokenProps = jwtDecode(refreshToken);
      const { id, userEmail, username } = decoded;
      //GENERATE A NEW ACCESS TOKEN
      const newAccessToken = await this.authUtility.generateRefreshToken({
        id,
        userEmail,
        username,
      });

      if (!newAccessToken) return null;

      return { refreshToken: newAccessToken };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
