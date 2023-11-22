import { UserDataSource, UserDto, UserRepository, User } from "../../domain";
import { CustomError } from "../../../../shared/domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  async getUserByEmail(emailValidated: string): Promise<User | null> {
    try {
      const user = await this.userDataSource.getUserByEmail(emailValidated);
      console.log("USER INSIDE USER REPOSITORY", user);

      if (!user) return null;
      return user;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async removeUser(emailValidated: string): Promise<User | null> {
    try {
      const user = await this.userDataSource.removeUser(emailValidated);
      if (!user) return null;
      return user;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async updateUser(userDto: UserDto): Promise<User | null> {
    try {
      const user = await this.userDataSource.updateUser(userDto);
      if (!user) return null;
      return user;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getAllUsers(): Promise<[] | User[]> {
    try {
      const users = await this.userDataSource.getAllUsers();
      if (!users) return [];
      return users;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  // async loginUser(userLoginDto: LoginUserDto): Promise<User | null> {
  //   try {
  //     const user = await this.userDataSource.loginUser(userLoginDto);
  //     if (!user) return null;
  //     return user;
  //   } catch (error) {
  //     if (error instanceof CustomError) {
  //       throw error;
  //     }
  //     throw CustomError.internalServer();
  //   }
  // }
  // async saveRefreshToken(
  //   email: string,
  //   accessToken: string
  // ): Promise<User | null> {
  //   try {
  //     const user = await this.userDataSource.saveRefreshToken(
  //       email,
  //       accessToken
  //     );
  //     if (!user) return null;
  //     return user;
  //   } catch (error) {
  //     if (error instanceof CustomError) {
  //       throw error;
  //     }
  //     throw CustomError.internalServer();
  //   }
  // }
}
