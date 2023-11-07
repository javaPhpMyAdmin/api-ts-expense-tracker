import { AddIncomeDto } from "./dtos/addIncome.dto";
import { Income } from "./income.entity";

export abstract class IncomeDataSource {
  abstract addIncome(incomeToAdd: AddIncomeDto): Promise<Income>;
  abstract getAllIncomes(): Promise<Income[]>;
  abstract getIncomeById(incomeId: string): Promise<Income | null>;
  abstract deleteIncome(incomeId: string): Promise<Income>;
}
