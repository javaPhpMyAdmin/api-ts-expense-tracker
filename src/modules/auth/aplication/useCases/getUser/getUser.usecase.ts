import { CustomError } from "../../../../../shared/domain";
import {
  User,
  UserEmailDto,
  UserRepository,
} from "../../../../../modules/users/domain";

export class GetUserByEmail {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(emailDto: UserEmailDto): Promise<User | undefined> {
    try {
      const user = await this.userRepository.getUserByEmail(emailDto);
      if (!user) {
        const error = new Error("Something went wrong trying to get the user");
        throw error;
      }
      return user;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }
}
