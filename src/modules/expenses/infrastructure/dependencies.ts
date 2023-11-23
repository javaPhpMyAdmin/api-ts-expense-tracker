import { ConsoleLogger } from '../../../shared/infrastructure';
import { ExpenseController } from '../presentation';

//LOGER INSTANCE
const logger = new ConsoleLogger();

export const expenseController = new ExpenseController(
  undefined,
  undefined,
  undefined,
  logger
);
