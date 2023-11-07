import { AddIncomeDto } from "./dtos/addIncome.dto";
import { Income } from "./income.entity";

export abstract class IncomeRepository {
  abstract getIncomeById(id: string): Promise<Income | null>;
  abstract getAllIncomes(): Promise<Income[] | null>;
  abstract deleteIncome(id: string): Promise<Income[] | null>;
  abstract addIncome(income: AddIncomeDto): Promise<Income | null>;
}
