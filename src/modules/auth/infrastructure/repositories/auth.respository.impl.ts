import { CustomError } from "../../../../shared/domain";
import { UserEmailDto, User } from "../../../users/domain";
import { AuthDatasource } from "../../domain/datasources";
import { RegisterUserDto, LoginUserDto } from "../../domain/dtos";
import { AuthRepository } from "../../domain/repositories";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDatasource) {}

  async saveToken(accessToken: string, userId: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async getUser(emailValidated: string): Promise<User | null> {
    try {
      const user = await this.authDataSource.getUser(emailValidated);

      if (!user) return null;
      return user;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async saveUser(registerUserDto: RegisterUserDto): Promise<User | null> {
    try {
      const user = await this.authDataSource.saveUser(registerUserDto);

      if (!user) return null;
      return user;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async loginUser(userLogin: LoginUserDto): Promise<User | null> {
    try {
      const user = await this.authDataSource.loginUser(userLogin);
      if (!user) return null;
      return user;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async saveRefreshToken(
    email: string,
    accessToken: string
  ): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
