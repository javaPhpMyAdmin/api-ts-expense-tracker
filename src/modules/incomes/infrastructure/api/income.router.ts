import { Router } from "express";
import { incomeController } from "../dependencies";

const incomeRouter = Router();

incomeRouter.get(
  "/get-incomes",
  incomeController.getIncomes.bind(incomeController)
);

incomeRouter.get(
  "/get-incomes/:id",
  incomeController.getIncomesById.bind(incomeController)
);

export default incomeRouter;
