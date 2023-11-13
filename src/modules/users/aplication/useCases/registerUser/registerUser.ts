import { CustomError } from '../../../../../shared/domain';
import { Logger } from '../../../../../shared/domain/logger';
import { UserRepository } from '../../../domain';
import { UserDto } from '../../../domain/dtos';
import { User } from '../../../domain/entities';

const useCase = '[Use case - RegisterUser]';
export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async registerUser(userDto: UserDto): Promise<User | null> {
    this.logger.info(`${useCase} - REGISTERING USER...`);
    return this.userRepository
      .saveUser(userDto)
      .then((user) => {
        this.logger.info(`${useCase} - USER REGISTERED`);
        return user;
      })
      .catch((err) => {
        this.logger.error(`${useCase} - USER NOT REGISTERED`);
        if (err instanceof CustomError) {
          throw err;
        }
        throw CustomError.internalServer();
      });
  }
}
