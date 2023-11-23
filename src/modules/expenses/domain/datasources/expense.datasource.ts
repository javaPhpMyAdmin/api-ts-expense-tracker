import { AddExpenseDto } from "../dtos";
import { Expense } from "../entities";

export abstract class ExpenseDataSource {
  abstract addExpense(
    expenseToAdd: AddExpenseDto,
    userId: string
  ): Promise<Expense>;
  abstract getAllExpenses(userId: string): Promise<Expense[]>;
  abstract getExpenseById(expenseId: string): Promise<Expense | null>;
  abstract deleteExpense(expenseId: string): Promise<Expense>;
}
