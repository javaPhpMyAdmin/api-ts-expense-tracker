import { AddIncomeDto } from "../dtos";
import { Income } from "../entities";

export abstract class IncomeRepository {
  abstract getIncomeById(id: string): Promise<Income | null>;
  abstract getAllIncomes(userId: string): Promise<Income[] | []>;
  abstract deleteIncome(id: string): Promise<Income[] | null>;
  abstract addIncome(income: AddIncomeDto, userId: string): Promise<Income>;
}
