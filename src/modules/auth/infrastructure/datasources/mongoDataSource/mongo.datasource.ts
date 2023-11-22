import { RegisterUserDto, LoginUserDto } from "../../..";
import { UserModel } from "../../../../../data/mongodb";
import { CustomError } from "../../../../../shared/domain";
import { UserEmailDto, User } from "../../../../users/domain";
import { UserMapper } from "../../../../users/infrastructure/mappers";
import { BcryptAdapter } from "../../../../users/utils";
import { AuthDatasource } from "../../../domain/datasources";

export class MongoDataSourceImpl implements AuthDatasource {
  constructor() {}
  async getUser(emailValidated: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({
        email: emailValidated,
      });
      if (!user) return null;

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async saveUser(registerUserDto: RegisterUserDto): Promise<User | null> {
    const { email, name, address, lastname, password, phone } = registerUserDto;

    try {
      const existsUser = await UserModel.findOne({ email });

      if (existsUser) throw CustomError.badRequest("Impossible to save user");

      //HASH THE PASSWORD
      const passwordHashed = BcryptAdapter.hash(password);

      const user = new UserModel({
        email,
        passwordHashed,
        name,
        lastname,
        phone,
        address,
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async loginUser(userLogin: LoginUserDto): Promise<User | null> {
    const { email, password } = userLogin;
    try {
      //CHECK IF THE USER EXISTS
      const existsUser = await UserModel.findOne({ email });

      if (!existsUser) return null;

      //CHECK IF THE PASSWORD ARE EQUALS
      const rightPassword = BcryptAdapter.compare(
        password,
        existsUser.passwordHashed
      );

      //FOR A WRONG PASSWORD RETURN NULL
      if (!rightPassword) return null;

      const userForAuthenticate = UserMapper.userEntityFromObject(existsUser)!;

      return userForAuthenticate;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async saveRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async saveToken(accessToken: string, userId: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
