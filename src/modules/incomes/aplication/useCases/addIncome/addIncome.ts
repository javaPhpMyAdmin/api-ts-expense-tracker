import { Logger } from "../../../../../shared/domain/logger/logger";
import { AddIncomeDto } from "../../../domain/dtos/addIncome.dto";
import { Income } from "../../../domain/entities/income.entity";
import { IncomeRepository } from "../../../domain/repositories/income.repository";

export class AddIncome {
  constructor(
    private readonly incomeRepository: IncomeRepository,
    private readonly logger: Logger
  ) {}

  async registerIncome(incomeToAdd: AddIncomeDto): Promise<Income | null> {
    this.logger.info(`[Use case - AddIncome] - Registering income`);
    try {
      const income = await this.incomeRepository.addIncome(incomeToAdd);
      if (!income) {
        const error = new Error("Something went wrong trying to add income");
        throw error;
      }
      this.logger.info(
        `[Use case - AddIncome] - Income Registered successfully`
      );
      return income;
    } catch (e) {
      this.logger.error(
        `[Use case - AddIncome - Error] - Error adding income ${e}`
      );

      return null;
    }
  }
}
