import { LoginUserDto, User, UserEmailDto } from '../../../users/domain';
import { RegisterUserDto } from '../dtos';

export abstract class AuthDatasource {
  abstract getUser(emailDto: UserEmailDto): Promise<User | null>;
  abstract saveUser(registerUserDto: RegisterUserDto): Promise<User | null>;
  abstract loginUser(userLogin: LoginUserDto): Promise<User | null>;
  abstract saveRefreshToken(
    userId: string,
    accessToken: string
  ): Promise<User | null>;
  abstract saveToken(accessToken: string, userId: string): Promise<User | null>;
}
