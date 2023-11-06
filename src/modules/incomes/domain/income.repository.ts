import { Income } from "./income.entity";

export interface IncomeRepository {
  getById(id: string): Promise<Income | null>;
  getAllIncomes(): Promise<Income[] | null>;
  deleteIncome(id: string): Promise<Income[] | null>;
  addIncome(income: Income): Promise<Income | null>;
}
