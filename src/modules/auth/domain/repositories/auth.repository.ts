import { LoginUserDto, User, UserEmailDto } from '../../../users/domain';
import { GoogleRegisterDto, RegisterUserDto } from '../dtos';

export abstract class AuthRepository {
  abstract getUser(emailValidated: string): Promise<User | null>;
  abstract saveUser(
    registerUserDto: RegisterUserDto | GoogleRegisterDto
  ): Promise<User | null>;
  abstract loginUser(userLogin: LoginUserDto): Promise<User | null>;
  abstract saveRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<User | null>;
  abstract saveToken(accessToken: string, userId: string): Promise<User | null>;
  abstract loginWithGoogle?(): Promise<User | null>;
}
