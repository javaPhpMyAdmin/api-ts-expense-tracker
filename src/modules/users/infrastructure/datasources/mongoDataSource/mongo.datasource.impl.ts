import { UserModel } from '../../../../../data/mongodb';
import { CustomError } from '../../../../../shared/domain';
import { User, UserDataSource, UserDto, UserEmailDto } from '../../../domain';
import { UserMapper } from '../../mappers';

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

  async removeUser(emailDto: UserEmailDto): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  async updateUser(userDto: UserDto): Promise<User | null> {
    throw new Error('Method not implemented.');
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
}
