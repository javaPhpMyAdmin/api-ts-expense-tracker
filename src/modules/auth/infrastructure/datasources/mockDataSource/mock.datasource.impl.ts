import { RegisterUserDto, LoginUserDto } from "../../..";
import { UserEmailDto, User } from "../../../../users/domain";
import { AuthDatasource } from "../../../domain/datasources";

export class MockDataSourceImpl implements AuthDatasource {
  constructor() {}
  getUser(emailValidated: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  saveUser(registerUserDto: RegisterUserDto): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  loginUser(userLogin: LoginUserDto): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  saveRefreshToken(userId: string, refreshToken: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  saveToken(accessToken: string, userId: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
