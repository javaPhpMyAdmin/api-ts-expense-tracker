import { CustomError } from "../../../../../shared/domain";
import {
  User,
  UserEmailDto,
  UserRepository,
} from "../../../../../modules/users/domain";
import { AuthRepository } from "modules/auth";

export class GetUserByEmail {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(emailValidated: string): Promise<User | undefined> {
    try {
      const user = await this.authRepository.getUser(emailValidated);
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
