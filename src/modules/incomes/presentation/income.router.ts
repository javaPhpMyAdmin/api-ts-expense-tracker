import { NextFunction, Request, Response, Router } from "express";
import { incomeController } from "../infrastructure/dependencies";
import { loggerMiddleware } from "../../../shared/infrastructure/dependencies";

export const incomeRouter = Router();

incomeRouter.use((req: Request, res: Response, next: NextFunction) =>
  loggerMiddleware.logRequest(req, res, next)
);
incomeRouter.get(
  "/get-incomes/:incomeId",
  incomeController.getIncomesById.bind(incomeController)
);
incomeRouter.get(
  "/get-incomes-by-user-id",
  incomeController.getIncomesForUserId.bind(incomeController)
);

incomeRouter.post(
  "/add-income",
  incomeController.registerIncome.bind(incomeController)
);

incomeRouter.delete(
  "/delete-income/:incomeId",
  incomeController.deleteIncome.bind(incomeController)
);

// incomeRouter.put(
//   "/update-income/:incomeId",
//   incomeController.updateIncome.bind(incomeController)
// );
