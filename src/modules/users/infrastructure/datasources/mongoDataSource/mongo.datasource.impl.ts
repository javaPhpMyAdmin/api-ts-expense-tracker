import { UserModel } from "../../../../../data/mongodb";
import { CustomError } from "../../../../../shared/domain";
import { User, UserDataSource, UserDto } from "../../../domain";
import { UserMapper } from "../../mappers";

export class MongoDataSourceImpl implements UserDataSource {
  async getUserByEmail(emailValidated: string): Promise<User | null> {
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

  async removeUser(emailValidated: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async updateUser(userDto: UserDto): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async getAllUsers(): Promise<User[] | null> {
    try {
      const users = await UserModel.find();
      const usersMapped = users.map((user) =>
        UserMapper.userEntityFromObject(user)
      );
      return usersMapped as User[] | null;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async saveUserImage(
    emailValidated: string,
    userImage: string
  ): Promise<User | null> {
    try {
      const user = await UserModel.findOne({
        email: emailValidated,
      });
      if (!user) return null;
      user.imageProfile = userImage;

      const userImageUpdated = await user.save();
      if (!userImageUpdated) return null;

      return UserMapper.userEntityFromObject(userImageUpdated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
