import { envs } from "../../../shared/infrastructure/envs";
import { Request } from "express";
import jwt from "jsonwebtoken";

export class AuthUtility {
  constructor() {}

  async generateToken(
    payload: Object,
    duration: string = "1h" //envs.TOKEN_EXPIRATES_IN
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.TOKEN_SECRET_KEY,
        { expiresIn: duration },
        (error, token) => {
          if (error) return resolve(null);

          resolve(token!);
        }
      );
    });
  }

  generateRefreshToken(
    payload: Object,
    duration: string = "1h" //envs.TOKEN_EXPIRATES_IN
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: duration },
        (error, token) => {
          if (error) return resolve(null);

          resolve(token!);
        }
      );
    });
  }

  verifyAccessToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.TOKEN_SECRET_KEY, (error, decoded) => {
        if (error) return resolve(null);
        resolve(decoded as T);
      });
    });
  }

  verifyRefreshToken<T>(refreshToken: string): Promise<T | string | null> {
    return new Promise((resolve) => {
      jwt.verify(
        refreshToken,
        envs.REFRESH_TOKEN_SECRET_KEY,
        (error, decoded) => {
          if (error?.message !== "jwt expired") return resolve("expired-token");
          if (error) return resolve(null);

          resolve(decoded as T);
        }
      );
    });
  }

  validateHeaders(req: Request): [string?, string?, string?] {
    const authorization = req.header("Authorization");
    if (!authorization) return ["No token provided"];

    if (!authorization.startsWith("Bearer "))
      return [undefined, "Invalid Bearer token provided", undefined];

    const token = authorization.split(" ").at(1) || "";

    return [undefined, undefined, token];
  }
}
