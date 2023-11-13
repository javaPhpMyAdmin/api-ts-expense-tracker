import { AddIncomeDto } from '../dtos/addIncome.dto';
import { Income } from '../entities/income.entity';

export abstract class IncomeRepository {
  abstract getIncomeById(id: string): Promise<Income | null>;
  abstract getAllIncomes(): Promise<Income[] | []>;
  abstract deleteIncome(id: string): Promise<Income[] | null>;
  abstract addIncome(income: AddIncomeDto): Promise<Income>;
}
