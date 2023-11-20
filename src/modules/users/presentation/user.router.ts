import { Router } from 'express';
import { userController } from '../infrastructure/dependencies';

export class UserRoutes {
  static get routes(): Router {
    const userRouter = Router();

    userRouter.get(
      '/get-users',
      userController.getAllUsers.bind(userController)
    );

    userRouter.get(
      '/get-user/:id',
      userController.getUserByEmail.bind(userController)
    );

    userRouter.delete(
      '/delete-user/:userId',
      userController.deleteUser.bind(userController)
    );

    userRouter.put(
      '/update-user/:userId',
      userController.updateUser.bind(userController)
    );

    return userRouter;
  }
}
