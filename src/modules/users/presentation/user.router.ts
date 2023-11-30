import { NextFunction, Request, Router } from "express";
import { userController } from "../infrastructure/dependencies";
import { multerMiddleware } from "../../../shared/infrastructure";
import { MulterMiddleware } from "../../../shared/presentation/middlewares";

export class UserRoutes {
  static get routes(): Router {
    const userRouter = Router();

    userRouter.get(
      "/get-users",
      userController.getAllUsers.bind(userController)
    );

    userRouter.get(
      "/get-user-by-email/:email",
      userController.getUserByEmail.bind(userController)
    );

    userRouter.delete(
      "/delete-user/:userId",
      userController.deleteUser.bind(userController)
    );

    userRouter.put(
      "/update-user/:userId",
      userController.updateUser.bind(userController)
    );

    userRouter.post(
      "/upload-image-profile",
      multerMiddleware.upload(),
      userController.uploadImageProfile.bind(userController)
    );

    return userRouter;
  }
}
