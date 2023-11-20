import { Application } from "express";
import { envs } from "../../infrastructure/envs";
import { incomeRouter } from "../../../modules/incomes/presentation";
import { UserRoutes } from "../../../modules/users/presentation";
import { AuthMiddleware, AuthRoutes } from "../../../modules/auth/presentation";
import authMiddleware from "../../../modules/auth/infrastructure/dependencies";
export class HTTPRouter {
  constructor() {}

  setApplication(app: Application) {
    //INCOMES ROUTES
    app?.use(`${envs.API_VERSION_PREFIX}`, incomeRouter);

    //EXPENSES ROUTES
    // this.app?.use(`${envs.API_VERSION_PREFIX}`, ExpenseRouter.routes);

    //AUTH ROUTES
    app?.use(`${envs.API_VERSION_PREFIX_AUTH}`, AuthRoutes.routes);

    //USER ROUTES
    app?.use(
      `${envs.API_VERSION_PREFIX}`,
      [authMiddleware.validateToken],
      UserRoutes.routes
    );

    //NOT FOUND ROUTES
    app?.use("/", (req, res) => {
      res.status(200).send("IT WORKS");
    });
  }
}
