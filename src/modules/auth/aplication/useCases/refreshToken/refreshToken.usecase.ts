import { AuthRepository, AuthUtility, ValidateTokenProps } from "modules/auth";
import jwt from "jsonwebtoken";
import { CustomError } from "../../../../../shared/domain";

export class RefreshTokenUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authUtility: AuthUtility
  ) {}

  async execute(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      //VERIFY REFRESH TOKEN
      const validRefreshToken =
        await this.authUtility.verifyRefreshToken<ValidateTokenProps>(
          refreshToken
        );

      if (!validRefreshToken) return null;

      //GET THE USER ID FROM THE VALID REFRESH TOKEN
      console.log("TOKEN DECODED", validRefreshToken);

      //GENERATE A NEW ACCESS TOKEN
      const newAccessToken = await this.authUtility.generateToken(
        validRefreshToken
      );

      if (!newAccessToken) return null;

      //RETURN THEM, ACCESS TOKEN AND REFRESH TOKEN
      //   const token = await this.authRepository.saveRefreshToken(
      //     decoded?.userId!,
      //     refreshToken
      //   );

      return { accessToken: newAccessToken, refreshToken };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
