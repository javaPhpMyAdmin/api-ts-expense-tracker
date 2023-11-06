import { Logger } from "../../../../shared/domain/logger";
import { Income } from "../../domain/income.entity";
import { IncomeRepository } from "../../domain/income.repository";

export class GetIncomeById {
  constructor(
    private readonly incomeRepo: IncomeRepository,
    private readonly logger: Logger
  ) {}
  async getIncomeById(incomeId: string): Promise<Income | null> {
    this.logger.info(
      `[Get income by Id] - Getting a income with id ${incomeId}`
    );
    const income = this.incomeRepo.getById(incomeId);

    if (!income) {
      const error = new Error(`Income not found: ${incomeId}`);
      this.logger.error(error.message);
      throw error;
    }

    this.logger.info(
      `[Get income by Id] - Income with id ${incomeId} retrieved successfully `
    );
    return income;
  }
}
