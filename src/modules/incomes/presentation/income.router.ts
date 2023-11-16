import { NextFunction, Request, Response, Router } from "express";
import { incomeController } from "../infrastructure/dependencies";
import { loggerMiddleware } from "../../../shared/infrastructure/dependencies";

export const incomeRouter = Router();

incomeRouter.use((req: Request, res: Response, next: NextFunction) =>
  loggerMiddleware.logRequest(req, res, next)
);

incomeRouter.get(
  "/get-incomes",
  incomeController.getIncomes.bind(incomeController)
);

incomeRouter.get(
  "/get-incomes/:id",
  incomeController.getIncomesById.bind(incomeController)
);

incomeRouter.post(
  "/add-income/:id",
  incomeController.registerIncome.bind(incomeController)
);
