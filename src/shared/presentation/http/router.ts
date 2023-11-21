import { Application } from "express";
import { envs } from "../../infrastructure/envs";
import { incomeRouter } from "../../../modules/incomes/presentation";
import { UserRoutes } from "../../../modules/users/presentation";
import { AuthRoutes } from "../../../modules/auth/presentation";
import { authMiddleware } from "../../../modules/auth/infrastructure/dependencies";
export class HTTPRouter {
  constructor() {}

  setApplication(app: Application) {
    //AUTH ROUTES
    app?.use(`${envs.API_VERSION_PREFIX_AUTH}`, AuthRoutes.routes);

    //USER ROUTES
    app?.use(
      `${envs.API_VERSION_PREFIX}`,
      authMiddleware.validateToken,
      UserRoutes.routes
    );
    //INCOMES ROUTES
    app?.use(
      `${envs.API_VERSION_PREFIX}`,
      authMiddleware.validateToken,
      incomeRouter
    );

    //EXPENSES ROUTES
    // this.app?.use(`${envs.API_VERSION_PREFIX}`, ExpenseRouter.routes);

    //NOT FOUND ROUTES
    app?.use("/", (req, res) => {
      res.status(200).send("IT WORKS");
    });
  }
}
