import { Logger } from "../../../../../shared/domain/logger/logger";
import { Income } from "../../../domain/entities/income.entity";
import { IncomeRepository } from "../../../domain/repositories/income.repository";

export class GetAllIncomes {
  constructor(
    private readonly incomeRepository: IncomeRepository,
    private readonly logger: Logger
  ) {}

  async getAllIncomes(): Promise<Income[] | null> {
    this.logger.info(`[Use Case - GetALLIncomes] - Retrieving all incomes`);
    try {
      const incomes = await this.incomeRepository.getAllIncomes();
      if (!incomes) {
        const error = new Error(
          "[Use Case - GetAllIncomes - Error] - There is not incomes for now"
        );
        this.logger.error(error.message);
        throw error;
      }
      this.logger.info(
        `[Use Case - GetALLIncomes] - All Incomes retrieved successfully`
      );
      return incomes;
    } catch (erro) {
      return null;
    }
  }
}
