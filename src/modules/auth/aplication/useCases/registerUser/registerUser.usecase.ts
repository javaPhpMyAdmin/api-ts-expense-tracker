import {
  User,
  UserEmailDto,
  UserRepository,
} from '../../../../../modules/users/domain';
import { CustomError } from '../../../../../shared/domain';
import { Logger } from '../../../../../shared/domain/logger';
import { RegisterUserDto } from '../../../../../modules/auth/domain/dtos';
import { AuthRepository } from '../../..';

const useCase = '[Use case - RegisterUser]';
export class RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly logger: Logger
  ) {}

  async registerUser(
    registerUserDto: RegisterUserDto
  ): Promise<User | undefined> {
    this.logger.info(`${useCase} - REGISTERING USER...`);
    try {
      const [error, email] = UserEmailDto.create(registerUserDto.email);
      if (error) throw CustomError.badRequest(error);

      const user = await this.authRepository.saveUser(registerUserDto);
      if (!user) {
        const error = new Error('Something went wrong trying to register user');
        throw error;
      }

      this.logger.info(`${useCase} - USER REGISTERED SUCCESSFULLY`);
      /*TODO:
      HERE IS WHERE I NEED TO CREATE THE TOKEN FOR THIS USER AND RETURN IT WITH THE USER OR MAYBE IN THE LOGIN FUNCTION IS A BETTER OPTION*/
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
