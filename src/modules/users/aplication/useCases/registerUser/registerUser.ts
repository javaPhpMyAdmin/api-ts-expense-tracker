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

  async registerUser(userDto: UserDto): Promise<User | undefined> {
    this.logger.info(`${useCase} - REGISTERING USER...`);

    try {
      const user = await this.userRepository.saveUser(userDto);
      if (!user) {
        const error = new Error('Something went wrong trying to register user');
        throw error;
      }
      this.logger.info(`${useCase} - USER REGISTERED SUCCESSFULLY`);
      return user;
    } catch (error) {
      this.logger.error(`${useCase} - ERROR REGISTERING USER, ${error}`);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
