import { UserDto, UserEmailDto, LoginUserDto } from '..';
import { User } from '../entities';

export abstract class UserDataSource {
  abstract getUserByEmail(emailDto: UserEmailDto): Promise<User | null>;
  abstract removeUser(emailDto: UserEmailDto): Promise<User | null>;
  abstract updateUser(userDto: UserDto): Promise<User | null>;
  abstract getAllUsers(): Promise<User[] | null>;
}
