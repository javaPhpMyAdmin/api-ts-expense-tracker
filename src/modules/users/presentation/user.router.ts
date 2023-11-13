import { Router } from 'express';
import { userController } from '../infrastructure/dependencies';

export class UserRoutes {
  static get routes(): Router {
    const userRouter = Router();

    userRouter.post('/login', userController.loginUser.bind(userController));
    userRouter.post(
      '/register',
      userController.registerUser.bind(userController)
    );

    userRouter.get(
      '/get-users',
      userController.getAllUsers.bind(userController)
    );

    userRouter.get(
      '/get-user/:id',
      userController.getUserByEmail.bind(userController)
    );

    return userRouter;
  }
}
