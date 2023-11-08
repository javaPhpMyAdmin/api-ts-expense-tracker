import { Logger } from "../../../../shared/domain/logger/logger";
import { Income } from "../../domain/income.entity";
import { IncomeRepository } from "../../domain/income.repository";

export class GetAllIncomes {
  constructor(
    private readonly incomeRepository: IncomeRepository,
    private readonly logger: Logger
  ) {}

  async getAllIncomes(): Promise<Income[] | null> {
    this.logger.info(`[Get All Incomes] - Retrieving all incomes`);

    const incomes = this.incomeRepository.getAllIncomes();
    if (!incomes) {
      const error = new Error("There is not incomes for now");
      this.logger.error(error.message);
      throw error;
    }

    this.logger.info(`[Get All Incomes] - All Incomes retrieved with success`);
    return incomes;
  }
}
