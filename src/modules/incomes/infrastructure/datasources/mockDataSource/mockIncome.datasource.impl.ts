import { IncomeDataSource } from "../../../domain/datasources/income.datasource";
import { AddIncomeDto } from "../../../domain/dtos/addIncome.dto";
import { Income } from "../../../domain/entities/income.entity";
import { CustomError } from "../../../../../shared/domain/errors";
import { Incomes } from "./mock-incomes";

export class IncomeDataSourceImpl implements IncomeDataSource {
  async getIncomeById(incomeId: string): Promise<Income> {
    const income = Incomes.find((income) => income.id === incomeId);
    if (!income)
      throw CustomError.badRequest("Income with this id does not exists");
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
  async deleteIncome(incomeId: string): Promise<Income> {
    throw new Error("Method not implemented.");
  }
  async addIncome(incomeToAdd: AddIncomeDto): Promise<Income> {
    const { title, amount, category, date, description, type } = incomeToAdd;

    try {
      const incomeAdded = new Income(
        String(Incomes.length + 1),
        title,
        description,
        category,
        date,
        type,
        amount
      );
      Incomes.push(incomeAdded);

      return incomeAdded;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }

  async getAllIncomes(): Promise<Income[]> {
    return Incomes;
  }
}
