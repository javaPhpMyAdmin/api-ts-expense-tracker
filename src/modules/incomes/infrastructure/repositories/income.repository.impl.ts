import { CustomError } from "../../../../shared/domain";
import { IncomeDataSource } from "../../domain/datasources";
import { Income } from "../../domain/entities";
import { IncomeRepository } from "../../domain/repositories";

export class IncomeRepositoryImpl implements IncomeRepository {
  constructor(private readonly incomeDataSource: IncomeDataSource) {}

  async getIncomeById(id: string): Promise<Income | null> {
    try {
      const income = await this.incomeDataSource.getIncomeById(id);
      return income;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getAllIncomes(userId: string): Promise<Income[] | []> {
    try {
      const incomes = await this.incomeDataSource.getAllIncomes(userId);
      if (!incomes) return [];
      return incomes;
    } catch (error) {
      return [];
    }
  }

  async deleteIncome(id: string): Promise<Income[]> {
    throw new Error("no implemented yet");
  }

  async addIncome(income: Income, userId: string): Promise<Income> {
    const incomeAdded = await this.incomeDataSource.addIncome(income, userId);
    return incomeAdded;
  }
}
