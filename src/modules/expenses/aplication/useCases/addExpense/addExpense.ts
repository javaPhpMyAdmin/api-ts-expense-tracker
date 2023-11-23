import { ExpenseRepository } from "modules/expenses/domain/repositories";
import { CustomError } from "../../../../../shared/domain";
import { Logger } from "../../../../../shared/domain/logger/logger";
import { Expense } from "../../../../../modules/expenses/domain/entities";
import { AddExpenseDto } from "../../../../../modules/expenses/domain/dtos";

const useCase = "[Use case - AddIncome]";
export class AddExpense {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly logger: Logger
  ) {}

  async registerExpense(
    expenseToAdd: AddExpenseDto,
    userId: string
  ): Promise<Expense | undefined> {
    this.logger.info(`${useCase} - Registering expense`);
    try {
      const expense = await this.expenseRepository.addExpense(
        expenseToAdd,
        userId
      );
      if (!expense) {
        const error = new Error("Something went wrong trying to add expense");
        throw error;
      }
      this.logger.info(`${useCase} - Expense Registered successfully`);
      return expense;
    } catch (e) {
      this.logger.error(`${useCase} - Error adding expense, ${e}`);
      if (e instanceof CustomError) {
        throw e;
      }
      throw CustomError.internalServer();
    }
  }
}
