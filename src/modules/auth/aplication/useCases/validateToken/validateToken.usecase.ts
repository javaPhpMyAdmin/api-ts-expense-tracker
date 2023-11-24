import { CustomError } from '../../../../../shared/domain';
import { AuthUtility } from '../../../../../modules/auth/utils';

// const authUtility = new AuthUtility();

export type ValidateTokenProps = {
  id: string;
  userEmail: string;
  username: string;
};
export class ValidateTokenUseCase {
  constructor(private readonly authUtil: AuthUtility) {}

  async verify(
    token: string
  ): Promise<{ id: string; userEmail: string; username: string } | null> {
    try {
      const payload =
        await this.authUtil.verifyRefreshToken<ValidateTokenProps>(token);
      if (!payload || payload === 'expired-token') return null;
      return payload as ValidateTokenProps;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
