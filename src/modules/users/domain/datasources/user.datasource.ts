import { UserDto, UserEmailDto, UserLoginDto } from '..';
import { User } from '../entities';

export abstract class UserDataSource {
  abstract getUserByEmail(emailDto: UserEmailDto): Promise<User | null>;
  abstract saveUser(userDto: UserDto): Promise<User | null>;
  abstract removeUser(emailDto: UserEmailDto): Promise<User | null>;
  abstract updateUser(userDto: UserDto): Promise<User | null>;
  abstract getAllUsers(): Promise<User[] | null>;
  abstract loginUser(userLogin: UserLoginDto): Promise<User | null>;
  abstract saveRefreshToken(
    email: string,
    accessToken: string
  ): Promise<User | null>;
}
