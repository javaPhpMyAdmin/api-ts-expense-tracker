import { Application } from "express";
import { envs } from "../../infrastructure/envs";
import { incomeRouter } from "../../../modules/incomes/presentation";
import { UserRoutes } from "../../../modules/users/presentation";
import { AuthRoutes } from "../../../modules/auth/presentation";
import { authMiddleware } from "../../../modules/auth/infrastructure/dependencies";
import { ExpenseRoutes } from "../../../modules/expenses/presentation";
export class HTTPRouter {
  constructor() {}

  setApplication(app: Application) {
    //AUTH ROUTES
    app.use(`${envs.API_VERSION_PREFIX_AUTH}`, AuthRoutes.routes);

    //USER ROUTES
    app.use(
      `${envs.API_VERSION_PREFIX}`,
      [authMiddleware.validateHeaders, authMiddleware.validateToken],
      UserRoutes.routes
    );
    //INCOMES ROUTES
    app.use(
      `${envs.API_VERSION_PREFIX}`,
      [authMiddleware.validateHeaders, authMiddleware.validateToken],
      incomeRouter
    );

    //EXPENSES ROUTES
    app.use(
      `${envs.API_VERSION_PREFIX}`,
      [authMiddleware.validateHeaders, authMiddleware.validateToken],
      ExpenseRoutes.routes
    );

    //NOT FOUND ROUTES
    app.use("/", (req, res) => {
      res.status(200).send("IT WORKS");
    });
  }
}
