import { AddIncomeDto } from "@/modules/incomes/domain/dtos/addIncome.dto";
import { Income } from "@/modules/incomes/domain/income.entity";
import { IncomeDataSource } from "../../../domain/income.datasource";

export class MongoDataSourceImpl implements IncomeDataSource {
  addIncome(incomeToAdd: AddIncomeDto): Promise<Income> {
    throw new Error("Method not implemented.");
  }
  getAllIncomes(): Promise<Income[]> {
    throw new Error("Method not implemented.");
  }
  getIncomeById(incomeId: string): Promise<Income | null> {
    throw new Error("Method not implemented.");
  }
  deleteIncome(incomeId: string): Promise<Income> {
    throw new Error("Method not implemented.");
  }
}
