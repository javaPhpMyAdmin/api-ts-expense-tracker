import { CustomError, Logger } from '../../../../../shared/domain';
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
      const users = await this.userRepository.getAllUsers();
      if (!users) {
        const error = new Error(
          'Something went wrong trying to retrieving users'
        );
        throw error;
      }

      this.logger.info(`${useCase} -  USERS RETRIEVED SUCCESSFULLY...`);

      return users;
    } catch (error) {
      this.logger.error(`${useCase} - ERROR REGISTERING USER, ${error}`);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
