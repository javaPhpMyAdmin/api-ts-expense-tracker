import { CustomError } from "../../../../../shared/domain";
import { NextFunction, Request, Response } from "express";
import { AuthUtility } from "../../../../../modules/auth/utils";

const authUtility = new AuthUtility();

export type ValidateTokenProps = {
  id: string;
  email: string;
  username: string;
};
export class ValidateTokenUseCase {
  constructor(private readonly authUtil: AuthUtility) {}
  async verify(
    accessToken: string
  ): Promise<{ id: string; email: string; username: string }> {
    try {
      console.log("VALIDATE TOKEN USE CASE", accessToken);
      const payload = await this.authUtil.verifyAccessToken<ValidateTokenProps>(
        accessToken!
      );
      console.log("validate token payload", payload);

      if (!payload) throw CustomError.unauthorized("Invalid accessToken");
      return payload;
    } catch (error) {
      console.log("ERROR VALIDATE TOKEN ", error);

      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }
}
