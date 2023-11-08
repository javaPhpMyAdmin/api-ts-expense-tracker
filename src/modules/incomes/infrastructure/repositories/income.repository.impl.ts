import { IncomeDataSource } from "../../domain/datasources/income.datasource";
import { Income } from "../../domain/entities/income.entity";
import { IncomeRepository } from "../../domain/repositories/income.repository";

export class IncomeRepositoryImpl implements IncomeRepository {
  constructor(private readonly mockIncomeDataSource: IncomeDataSource) {}
  async getIncomeById(id: string): Promise<Income | null> {
    const income = this.mockIncomeDataSource.getIncomeById(id);
    return income;
  }
  async getAllIncomes(): Promise<Income[] | []> {
    const incomes = this.mockIncomeDataSource.getAllIncomes();
    if (!incomes) return [];
    return incomes;
  }
  async deleteIncome(id: string): Promise<Income[]> {
    throw new Error("no implemented yet");
  }
  async addIncome(income: Income): Promise<Income> {
    const incomeAdded = this.mockIncomeDataSource.addIncome(income);
    return incomeAdded;
  }
}
