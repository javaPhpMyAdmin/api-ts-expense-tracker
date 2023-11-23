import { ExpenseDataSource } from "../../../../modules/expenses/domain/datasources";
import { CustomError } from "../../../../shared/domain";
import { Expense } from "../../domain/entities";
import { ExpenseRepository } from "../../domain/repositories";

export class ExpenseRepositoryImpl implements ExpenseRepository {
  constructor(private readonly expenseDataSource: ExpenseDataSource) {}

  async getExpenseById(id: string): Promise<Expense | null> {
    try {
      const expense = await this.expenseDataSource.getExpenseById(id);
      return expense;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getAllExpenses(userId: string): Promise<Expense[] | []> {
    try {
      const expenses = await this.expenseDataSource.getAllExpenses(userId);
      if (!expenses) return [];
      return expenses;
    } catch (error) {
      return [];
    }
  }

  async deleteExpense(id: string): Promise<Expense[]> {
    throw new Error("no implemented yet");
  }

  async addExpense(expense: Expense, userId: string): Promise<Expense> {
    const expenseAdded = await this.expenseDataSource.addExpense(
      expense,
      userId
    );
    return expenseAdded;
  }
}
