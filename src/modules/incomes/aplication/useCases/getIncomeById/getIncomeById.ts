import { Logger } from "../../../../../shared/domain/logger";
import { Income } from "../../../domain/entities";
import { IncomeRepository } from "../../../domain/repositories";

export class GetIncomeById {
  constructor(
    private readonly incomeRepo: IncomeRepository,
    private readonly logger: Logger
  ) {}
  async getIncomeById(incomeId: string): Promise<Income | null> {
    this.logger.info(
      `[Use case - GetIncomeById] - Getting an income with id: ${incomeId}`
    );
    const income = await this.incomeRepo.getIncomeById(incomeId);

    if (!income) {
      const error = new Error(
        `[Use case - GetIncomeById- ERROR] - Income not found: ${incomeId}`
      );
      this.logger.error(error.message);
      throw error;
    }

    this.logger.info(
      `[Use case - GetIncomeById] - Income with id ${incomeId} retrieved successfully `
    );
    return income;
  }
}
