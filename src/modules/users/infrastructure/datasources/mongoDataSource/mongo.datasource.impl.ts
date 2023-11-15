import { log } from "console";
import { UserModel } from "../../../../../data/mongodb";
import { CustomError } from "../../../../../shared/domain";
import {
  User,
  UserDataSource,
  UserDto,
  UserEmailDto,
  UserLoginDto,
} from "../../../domain";
import { BcryptAdapter } from "../../../utils";
import { UserMapper } from "../../mappers";

export class MongoDataSourceImpl implements UserDataSource {
  async getUserByEmail(emailDto: UserEmailDto): Promise<User | null> {
    const { email } = emailDto;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return null;

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async saveUser(userDto: UserDto): Promise<User | null> {
    const { emailDto, name, address, lastname, password, phone } = userDto;
    try {
      //HASH THE PASSWORD
      const passwordHashed = BcryptAdapter.hash(password);
      const email = emailDto;

      const user = await UserModel.create({
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
  removeUser(emailDto: UserEmailDto): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  updateUser(userDto: UserDto): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  getAllUsers(): Promise<User[] | []> {
    throw new Error("Method not implemented.");
  }

  loginUser(userLogin: UserLoginDto): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  saveRefreshToken(email: string, accessToken: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
