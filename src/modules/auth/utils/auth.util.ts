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
    duration: string = "20s" //envs.TOKEN_EXPIRATES_IN
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

  verifyRefreshToken<T>(token: string): Promise<T | string | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.REFRESH_TOKEN_SECRET_KEY, (error, decoded) => {
        if (error?.message === "jwt expired") return resolve("expired-token");
        if (error) return resolve(null);

        resolve(decoded as T);
      });
    });
  }

  validateHeaders(req: Request): [string?, string?, string?] {
    const userCookie = req.cookies;

    const userSession = userCookie["userSession"];
    if (!userSession) return ["No session provided for this user"];

    return [undefined, userSession];
  }
}
