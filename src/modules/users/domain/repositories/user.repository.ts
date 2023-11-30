import { UserDto, UserEmailDto } from "..";
import { User } from "../entities";

export abstract class UserRepository {
  abstract getUserByEmail(emailValidated: string): Promise<User | null>;
  abstract removeUser(emailValidated: string): Promise<User | null>;
  abstract updateUser(userDto: UserDto): Promise<User | null>;
  abstract getAllUsers(): Promise<User[] | null>;
  abstract saveUserImage(
    emailValidated: string,
    userImage: string
  ): Promise<User | null>;
}
