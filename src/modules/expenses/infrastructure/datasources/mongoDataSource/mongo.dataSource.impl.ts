import { ExpenseDataSource } from "../../../domain/datasources";
import { ExpenseModel, UserModel } from "../../../../../data/mongodb/models";
import { CustomError } from "../../../../../shared/domain/errors";
import { Error } from "mongoose";
import { AddExpenseDto } from "../../../../../modules/expenses/domain/dtos";
import { Expense } from "../../../../../modules/expenses/domain/entities";
import { ExpenseMapper } from "../../mappers/expense.mapper";

export class MongoDataSourceImpl implements ExpenseDataSource {
  async addExpense(
    expenseToAdd: AddExpenseDto,
    userId: string
  ): Promise<Expense> {
    const { title, description, amount, type, category, date } = expenseToAdd;
    try {
      const userToUpdate = await UserModel.findOne({
        _id: userId, //new ObjectId(userId),
      });

      if (!userToUpdate)
        throw CustomError.badRequest("User not found with this id");

      const expense = await ExpenseModel.create({
        title,
        description,
        amount,
        type,
        category,
        date,
        user: userId,
      });

      await expense.save();

      return ExpenseMapper.expenseEntityFromObject(expense);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      if (error instanceof Error) {
        throw CustomError.internalServer(error.message);
      }
      throw CustomError.internalServer();
    }
  }
  async getAllExpenses(userId: string): Promise<Expense[]> {
    try {
      const expenses = await ExpenseModel.find({
        user: userId,
      });

      const expensesMapped = expenses.map(
        ({ id, title, description, category, amount, type, date }) =>
          new Expense(id, title, description, category, date, type, amount)
      );

      return expensesMapped;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
  async getExpenseById(expenseId: string): Promise<Expense | null> {
    try {
      const expense = await ExpenseModel.findById(expenseId);

      if (!expense) {
        const error = new Error(
          `[Use case - GetExpenseById- ERROR] - Expense not found: ${expenseId}`
        );
        throw error;
      }

      return ExpenseMapper.expenseEntityFromObject(expense);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async deleteExpense(expenseId: string): Promise<Expense> {
    throw new Error("Method not implemented.");
  }
}
