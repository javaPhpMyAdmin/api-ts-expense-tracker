import { expenseController } from "../infrastructure/dependencies";
import { Router } from "express";

export class ExpenseRoutes {
  static get routes(): Router {
    const expenseRouter = Router();

    expenseRouter.get(
      "/get-expenses/:expenseId",
      expenseController.getExpensesById.bind(expenseController)
    );

    expenseRouter.get(
      "/get-expenses-by-user-id",
      expenseController.getExpensesForUserId.bind(expenseController)
    );

    expenseRouter.post(
      "/add-expense",
      expenseController.registerExpense.bind(expenseController)
    );

    expenseRouter.delete(
      "/delete-expense/:expenseId",
      expenseController.deleteExpense.bind(expenseController)
    );

    // expenseRouter.put(
    //   "/update-expense/:expenseId",
    //   expenseController.updateExpense.bind(expenseController)
    // );

    return expenseRouter;
  }
}
