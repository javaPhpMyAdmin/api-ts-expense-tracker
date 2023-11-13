import {
  User,
  UserDataSource,
  UserDto,
  UserEmailDto,
  UserLoginDto,
} from '../../../domain';

export class MockDataSourceImpl implements UserDataSource {
  saveUser(userDto: UserDto): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(emailDto: UserEmailDto): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  registerUser(userDto: UserDto): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  removeUser(emailDto: UserEmailDto): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  updateUser(userDto: UserDto): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  getAllUsers(): Promise<User[] | []> {
    throw new Error('Method not implemented.');
  }
  loginUser(userLogin: UserLoginDto): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  saveRefreshToken(email: string, accessToken: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
