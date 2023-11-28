import { Request, Response } from 'express';
import { ConsoleLogger } from '../../../../../shared/infrastructure';

const useCase = '[USE CASE - LOGOUT USER]';
export class LogoutUserUseCase {
  constructor(private readonly logger: ConsoleLogger) {}

  run(res: Response): Response {
    this.logger.info(`${useCase} - COOKIES WERE CLEARED`);
    return res.clearCookie('userSession', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }
}
