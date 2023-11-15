import { UserRepository } from "modules/users/domain";

export class LoginUser {
  constructor(private readonly userRepository?: UserRepository) {}

  async execute(
    username: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken?: string } | null> {
    return null;
  }
}
