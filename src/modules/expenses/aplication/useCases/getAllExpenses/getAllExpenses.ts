import { Expense } from "modules/expenses/domain/entities";
import { Logger } from "../../../../../shared/domain/logger";
import { ExpenseRepository } from "../../../../../modules/expenses/domain/repositories";
import { CustomError } from "../../../../../shared/domain";

export class GetAllExpenses {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly logger: Logger
  ) {}

  async getAllExpenses(userId: string): Promise<Expense[] | []> {
    try {
      this.logger.info("[Use Case - GetALLExpenses] - Retrieving all expenses");
      const expenses = await this.expenseRepository.getAllExpenses(userId);

      if (!expenses) {
        this.logger.info(
          "[Use Case - GetAllExpenses - Error] - There is not expenses for now"
        );
        return [];
      }

      this.logger.info(
        "[Use Case - GetALLIncomes] - All Incomes retrieved successfully"
      );
      return expenses;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }
}
