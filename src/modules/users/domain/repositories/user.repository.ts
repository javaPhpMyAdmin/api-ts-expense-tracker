import { UserDto, UserEmailDto } from '..';
import { User } from '../entities';

export abstract class UserRepository {
  abstract getUserByEmail(emailDto: UserEmailDto): Promise<User | null>;
  abstract removeUser(emailDto: UserEmailDto): Promise<User | null>;
  abstract updateUser(userDto: UserDto): Promise<User | null>;
  abstract getAllUsers(): Promise<User[] | null>;
}
