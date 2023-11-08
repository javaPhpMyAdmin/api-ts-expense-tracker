import { Router } from "express";
import { incomeController } from "../infrastructure/dependencies";

export const incomeRouter = Router();

incomeRouter.get(
  "/get-incomes",
  incomeController.getIncomes.bind(incomeController)
);

incomeRouter.get(
  "/get-incomes/:id",
  incomeController.getIncomesById.bind(incomeController)
);

incomeRouter.post(
  "/add-income",
  incomeController.registerIncome.bind(incomeController)
);
