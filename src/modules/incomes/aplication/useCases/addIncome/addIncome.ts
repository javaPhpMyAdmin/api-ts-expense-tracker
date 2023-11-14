import { CustomError } from '../../../../../shared/domain';
import { Logger } from '../../../../../shared/domain/logger/logger';
import { AddIncomeDto } from '../../../domain/dtos/addIncome.dto';
import { Income } from '../../../domain/entities/income.entity';
import { IncomeRepository } from '../../../domain/repositories/income.repository';

const useCase = '[Use case - AddIncome]';
export class AddIncome {
  constructor(
    private readonly incomeRepository: IncomeRepository,
    private readonly logger: Logger
  ) {}

  async registerIncome(incomeToAdd: AddIncomeDto): Promise<Income | undefined> {
    this.logger.info(`${useCase} - Registering income`);
    try {
      const income = await this.incomeRepository.addIncome(incomeToAdd);
      if (!income) {
        const error = new Error('Something went wrong trying to add income');
        throw error;
      }
      this.logger.info(`${useCase} - Income Registered successfully`);
      return income;
    } catch (e) {
      this.logger.error(`${useCase} - Error adding income, ${e}`);
      if (e instanceof CustomError) {
        throw e;
      }
      throw CustomError.internalServer();
    }
  }
}
