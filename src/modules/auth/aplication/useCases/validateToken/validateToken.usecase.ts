import { CustomError } from "../../../../../shared/domain";
import { NextFunction, Request, Response } from "express";
import { AuthUtility } from "../../../../../modules/auth/utils";

// const authUtility = new AuthUtility();

export type ValidateTokenProps = {
  id: string;
  email: string;
  username: string;
};
export class ValidateTokenUseCase {
  constructor(private readonly authUtil: AuthUtility) {}
  async verify(
    accessToken: string
  ): Promise<{ id: string; email: string; username: string } | null> {
    try {
      const payload = await this.authUtil.verifyAccessToken<ValidateTokenProps>(
        accessToken!
      );

      if (!payload) return null;
      return payload;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
