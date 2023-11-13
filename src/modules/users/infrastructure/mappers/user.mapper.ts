import { CustomError } from '../../../../shared/domain';
import { User, UserDto } from '../../domain';

export class UserMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static userEntityFromObject(object: { [key: string]: any }) {
    if (!object.email) throw CustomError.badRequest('Missing email for user');

    // const [error, userDto] = UserDto.create(object);

    // if (error) throw CustomError.badRequest(error);

    // const { email, name, address, lastname, password, phone } = userDto!;

    return new User(
      object.email,
      object.passwordHashed,
      object.name,
      object.lastname,
      object.phone,
      object.address
    );
  }
}
