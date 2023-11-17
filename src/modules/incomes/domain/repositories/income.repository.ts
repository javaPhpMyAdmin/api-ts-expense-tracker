import { ObjectId } from "mongoose";
import { AddIncomeDto } from "../dtos/addIncome.dto";
import { Income } from "../entities/income.entity";

export abstract class IncomeRepository {
  abstract getIncomeById(id: string): Promise<Income | null>;
  abstract getAllIncomes(userId: string): Promise<Income[] | []>;
  abstract deleteIncome(id: string): Promise<Income[] | null>;
  abstract addIncome(income: AddIncomeDto, userId: string): Promise<Income>;
}
