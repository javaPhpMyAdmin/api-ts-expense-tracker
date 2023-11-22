import { Logger } from "../../../../../shared/domain";
import { User, UserRepository } from "../../../domain";

export class GetUserByEmail {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return null;
    return user;
  }
}
