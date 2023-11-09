import { AddIncomeDto } from "../../../domain/dtos";
import { Income } from "../../../domain/entities";
import { IncomeDataSource } from "../../../domain/datasources";
import { IncomeModel } from "../../../../../data/mongodb/models";
import { CustomError } from "../../../../../shared/domain/errors";
import { IncomeMapper } from "../../mappers";

export class MongoDataSourceImpl implements IncomeDataSource {
  async addIncome(incomeToAdd: AddIncomeDto): Promise<Income> {
    const { title, description, amount, type, category, date } = incomeToAdd;
    try {
      const income = await IncomeModel.create({
        title,
        description,
        amount,
        type,
        category,
        date,
      });

      await income.save();

      return IncomeMapper.incomeEntityFromObject(income);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
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
    throw new Error("Method not implemented.");
  }
  async deleteIncome(incomeId: string): Promise<Income> {
    throw new Error("Method not implemented.");
  }
}
