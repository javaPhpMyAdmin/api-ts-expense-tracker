import { Logger } from '../../../../../shared/domain';
import { User, UserRepository } from '../../../domain';

const useCase = '[Use case - GetAllUsers]';

export class GetAllUsers {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async getAllUser(): Promise<User[] | undefined> {
    this.logger.info(`${useCase} - GETTING ALL USERS...`);
    try {
      //TODO: IMPLEMENTATION
    } catch (error) {}
    return undefined;
  }
}
