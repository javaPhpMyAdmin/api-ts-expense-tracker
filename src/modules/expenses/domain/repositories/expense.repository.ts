import { AddExpenseDto } from "../dtos";
import { Expense } from "../entities";

export abstract class ExpenseRepository {
  abstract getExpenseById(expenseId: string): Promise<Expense | null>;
  abstract getAllExpenses(userId: string): Promise<Expense[] | []>;
  abstract deleteExpense(expenseId: string): Promise<Expense[] | null>;
  abstract addExpense(expense: AddExpenseDto, userId: string): Promise<Expense>;
}
