import { AddIncomeDto } from "../dtos/addIncome.dto";
import { Income } from "../entities/income.entity";

export abstract class IncomeDataSource {
  abstract addIncome(
    incomeToAdd: AddIncomeDto,
    userId: string
  ): Promise<Income>;
  abstract getAllIncomes(): Promise<Income[]>;
  abstract getIncomeById(incomeId: string): Promise<Income | null>;
  abstract deleteIncome(incomeId: string): Promise<Income>;
}
