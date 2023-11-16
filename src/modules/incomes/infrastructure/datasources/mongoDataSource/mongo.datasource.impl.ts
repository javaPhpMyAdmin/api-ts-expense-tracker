import { AddIncomeDto } from "../../../domain/dtos";
import { Income } from "../../../domain/entities";
import { IncomeDataSource } from "../../../domain/datasources";
import { IncomeModel, UserModel } from "../../../../../data/mongodb/models";
import { CustomError } from "../../../../../shared/domain/errors";
import { IncomeMapper } from "../../mappers";
import { Error } from "mongoose";
import { User, UserFromDb } from "modules/users/domain";
import { ObjectId } from "mongodb";

export class MongoDataSourceImpl implements IncomeDataSource {
  async addIncome(incomeToAdd: AddIncomeDto, userId: string): Promise<Income> {
    const { title, description, amount, type, category, date } = incomeToAdd;
    try {
      const userToUpdate = await UserModel.findOne({
        _id: new ObjectId(userId),
      });

      if (!userToUpdate)
        throw CustomError.badRequest("User not found with this id");

      const income = await IncomeModel.create({
        title,
        description,
        amount,
        type,
        category,
        date,
        user: userId,
      });

      if (!income) throw CustomError.badRequest("BAD ID");

      const incomeSaved = await income.save();

      const updatedUser = await UserModel.findByIdAndUpdate(userId, {
        $push: { incomes: incomeSaved._id },
        new: true,
      });
      console.log("USER UPDATED", updatedUser);

      return IncomeMapper.incomeEntityFromObject(income);
    } catch (error) {
      console.log("ERROR SAVING AND UPDATING", error);

      if (error instanceof CustomError) {
        throw error;
      }
      if (error instanceof Error) {
        throw CustomError.internalServer(error.message);
      }
      throw CustomError.internalServer();
    }
  }
  async getAllIncomes(): Promise<Income[]> {
    try {
      const incomes = await IncomeModel.find();

      const incomesMapped = incomes.map(
        ({ id, title, description, category, amount, type, date }) =>
          new Income(id, title, description, category, date, type, amount)
      );

      return incomesMapped;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
  async getIncomeById(incomeId: string): Promise<Income | null> {
    try {
      const income = await IncomeModel.findById(incomeId);

      if (!income) {
        const error = new Error(
          `[Use case - GetIncomeById- ERROR] - Income not found: ${incomeId}`
        );
        throw error;
      }

      return IncomeMapper.incomeEntityFromObject(income);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async deleteIncome(incomeId: string): Promise<Income> {
    throw new Error("Method not implemented.");
  }
}
