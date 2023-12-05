import { Router } from 'express';
import { authController } from '../infrastructure/dependencies';
import '../utils';

export class AuthRoutes {
  static get routes(): Router {
    const authRouter = Router();

    authRouter.post('/login', authController.loginUser.bind(authController));

    authRouter.post(
      '/googleAuth',
      authController.googleAuthUser.bind(authController)
    );

    authRouter.post(
      '/register',
      authController.registerUser.bind(authController)
    );

    authRouter.post('/logout', authController.logout.bind(authController));

    authRouter.post(
      '/refresh-token',
      authController.refreshToken.bind(authController)
    );

    return authRouter;
  }
}
