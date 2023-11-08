import { Logger } from "../../../../shared/domain/logger/logger";
import { AddIncomeDto } from "../../domain/dtos/addIncome.dto";
import { Income } from "../../domain/income.entity";
import { IncomeRepository } from "../../domain/income.repository";

export class AddIncome {
  constructor(
    private readonly incomeRepository: IncomeRepository,
    private readonly logger: Logger
  ) {}

  async registerIncome(incomeToAdd: AddIncomeDto): Promise<Income | null> {
    this.logger.info(`[Register Income] - Registering income`);
    try {
      const income = await this.incomeRepository.addIncome(incomeToAdd);
      if (!income) {
        const error = new Error("Something went wrong trying to add income");
        throw error;
      }
      return income;
    } catch (e) {
      return null;
    }

    this.logger.info(`[Register Income] - Registered income successfully`);
  }
}
