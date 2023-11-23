import { Expense } from "modules/expenses/domain/entities";
import { CustomError } from "../../../../../shared/domain/errors";
import { Logger } from "../../../../../shared/domain/logger";
import { ExpenseRepository } from "../../../../../modules/expenses/domain/repositories";

export class GetExpenseById {
  constructor(
    private readonly expenseRepo: ExpenseRepository,
    private readonly logger: Logger
  ) {}
  async getExpenseById(expenseId: string): Promise<Expense | null> {
    try {
      this.logger.info(
        `[Use case - GetExpenseById] - Getting an expense with id: ${expenseId}`
      );
      const expense = await this.expenseRepo.getExpenseById(expenseId);

      if (!expense) {
        const error = new Error(
          `[Use case - GetExpenseById- ERROR] - Expense not found: ${expenseId}`
        );
        this.logger.error(error.message);
        throw error;
      }

      this.logger.info(
        `[Use case - GetExpenseById] - Expense with id ${expenseId} retrieved successfully `
      );
      return expense;
    } catch (error) {
      if (error instanceof CustomError) {
        this.logger.error(error.message);
      }
      this.logger.error("[USE CASE - GetExpenseById]- INTERNAL ERROR");
      throw new Error(`${CustomError.internalServer()}`);
    }
  }
}
