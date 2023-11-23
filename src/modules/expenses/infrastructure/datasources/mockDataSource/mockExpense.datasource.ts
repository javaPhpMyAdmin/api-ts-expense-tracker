import { CustomError } from "../../../../../shared/domain/errors";
import { Expenses } from "./mock-expenses";
import { AddExpenseDto } from "../../../../../modules/expenses/domain/dtos";
import { Expense } from "../../../../../modules/expenses/domain/entities";
import { ExpenseDataSource } from "../../../../../modules/expenses/domain/datasources";

export class ExpenseDataSourceImpl implements ExpenseDataSource {
  async getExpenseById(expenseId: string): Promise<Expense | null> {
    const expense = Expenses.find((expense) => expense.id === expenseId);
    if (!expense)
      throw CustomError.badRequest("Income with this id does not exists");
    return new Expense(
      expense.id,
      expense.title,
      expense.description,
      expense.category,
      expense.date,
      expense.type,
      expense.amount
    );
  }
  async deleteExpense(expenseId: string): Promise<Expense> {
    throw new Error("Method not implemented.");
  }
  async addExpense(
    expenseToAdd: AddExpenseDto,
    userId: string
  ): Promise<Expense> {
    const { title, amount, category, date, description, type } = expenseToAdd;

    try {
      const expenseAdded = new Expense(
        String(Expenses.length + 1),
        title,
        description,
        category,
        date,
        type,
        amount
      );
      Expenses.push(expenseAdded);

      return expenseAdded;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }

  async getAllExpenses(): Promise<Expense[]> {
    return Expenses;
  }
}
