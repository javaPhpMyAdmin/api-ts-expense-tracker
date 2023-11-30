import {
  User,
  UserDataSource,
  UserDto,
  UserEmailDto,
  LoginUserDto,
} from "../../../domain";

export class MockDataSourceImpl implements UserDataSource {
  saveUser(userDto: UserDto): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(emailValidated: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  registerUser(userDto: UserDto): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  removeUser(emailValidated: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  updateUser(userDto: UserDto): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  getAllUsers(): Promise<User[] | []> {
    throw new Error("Method not implemented.");
  }
  loginUser(userLogin: LoginUserDto): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  saveRefreshToken(email: string, accessToken: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  saveUserImage(
    emailValidated: string,
    userImage: string
  ): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
