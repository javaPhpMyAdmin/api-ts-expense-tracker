import { Request } from "express";
import { User } from "../../users/domain";
import jwt from "jsonwebtoken";

export class AuthUtility {
  constructor() {}

  async generateToken(
    payload: Object,
    duration: string = "15"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        "api_jwt_private_key",
        { expiresIn: duration },
        (error, token) => {
          if (error) return resolve(null);
          resolve(token!);
        }
      );
    });
  }

  generateRefreshToken(eamil: string): string {
    return "";
  }

  verifyAccessToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, "api_jwt_private_key", (error, decoded) => {
        if (error) return resolve(null);
        resolve(decoded as T);
      });
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
