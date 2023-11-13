import { Logger } from '../../../../../shared/domain';
import { User, UserDto, UserRepository } from '../../../domain';

const useCase = '[Use case - UpdateUser]';

export class UpdateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async updateUser(userDto: UserDto): Promise<User | undefined> {
    this.logger.info(`${useCase} - UPDATING USER...`);
    return undefined;
  }
}
