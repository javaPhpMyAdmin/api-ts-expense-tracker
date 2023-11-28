import { Response, Request } from 'express';

export class MakeCookie {
  static create(req: Request, res: Response, refreshToken: string) {
    return res.cookie('userSession', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, //ONE WEEK
    });
  }
}
