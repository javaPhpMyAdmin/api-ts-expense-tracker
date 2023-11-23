import { NextFunction, Request, Response, Router } from 'express';
import { expenseController } from '../infrastructure/dependencies';
import { loggerMiddleware } from '../../../shared/infrastructure/dependencies';

export const expenseRouter = Router();

expenseRouter.use((req: Request, res: Response, next: NextFunction) =>
  loggerMiddleware.logRequest(req, res, next)
);
expenseRouter.get(
  '/get-expenses/:expenseId',
  expenseController.getExpensesById.bind(expenseController)
);
expenseRouter.get(
  '/get-expenses-by-user-id',
  expenseController.getExpensesForUserId.bind(expenseController)
);

expenseRouter.post(
  '/add-expense',
  expenseController.registerExpense.bind(expenseController)
);

expenseRouter.delete(
  '/delete-expense/:expenseId',
  expenseController.deleteExpense.bind(expenseController)
);

// expenseRouter.put(
//   "/update-expense/:expenseId",
//   expenseController.updateExpense.bind(expenseController)
// );
