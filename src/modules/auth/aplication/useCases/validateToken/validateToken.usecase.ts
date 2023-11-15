import { CustomError } from "../../../../../shared/domain";
import { NextFunction, Request, Response } from "express";
import { AuthUtility } from "../../../../../modules/auth/utils";

const authUtility = new AuthUtility();

type ValidateTokenProps = {
  id: string;
  email: string;
  username: string;
};
export class ValidateToken {
  async verify(accessToken: string): Promise<ValidateTokenProps> {
    try {
      const payload = await authUtility.verifyAccessToken<ValidateTokenProps>(
        accessToken
      );
      if (!payload) throw CustomError.unauthorized("Invalid accessToken");
      return payload;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }
}
