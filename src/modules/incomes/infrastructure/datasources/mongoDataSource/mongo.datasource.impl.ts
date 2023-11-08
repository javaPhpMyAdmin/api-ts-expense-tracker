import { AddIncomeDto } from "../../../domain/dtos/addIncome.dto";
import { Income } from "../../../domain/entities/income.entity";
import { IncomeDataSource } from "../../../domain/datasources/income.datasource";
import { IncomeModel } from "../../../../../data/mongodb/models";
import { CustomError } from "../../../../../shared/domain/errors";

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
      //TODO: MAPPER TO Income ENTITY
      return new Income(
        income.id,
        income.title,
        income.description,
        income.category,
        income.date,
        income.type,
        income.amount
      );
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
