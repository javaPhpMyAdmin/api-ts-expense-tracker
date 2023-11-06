import { Income } from "../../domain/income.entity";
import { IncomeRepository } from "../../domain/income.repository";
import { Incomes } from "./mock-incomes";

export class MockIncomeRepository implements IncomeRepository {
  async getById(id: string): Promise<Income | null> {
    const income = Incomes.find((income) => income.id === id);
    if (!income) return null;
    return new Income(
      income.id,
      income.title,
      income.description,
      income.category,
      income.date,
      income.type,
      income.amount
    );
  }
  async getAllIncomes(): Promise<Income[] | []> {
    const incomes = Incomes.map((income) => income);
    if (incomes.length === 0) return [];
    return incomes;
  }
  async deleteIncome(id: string): Promise<Income[] | null> {
    const incomeToDelete = Incomes.filter((income) => income.id !== id);
    if (!incomeToDelete) return null;
    return incomeToDelete;
  }
  async addIncome(income: Income): Promise<Income | null> {
    Incomes.push(income);
    return income;
  }
}
