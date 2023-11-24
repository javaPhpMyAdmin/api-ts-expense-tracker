import { Response } from "express";

export class MakeCookie {
  static create(res: Response, refreshToken: string) {
    return res.cookie("userSession", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, //ONE WEEK
    });
  }
}
