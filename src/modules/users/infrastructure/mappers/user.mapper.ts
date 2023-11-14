import { UserFromDb } from "../../../../modules/users/domain/dtos";
import { CustomError } from "../../../../shared/domain";
import { User, UserDto } from "../../domain";

export class UserMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static userEntityFromObject(object: { [key: string]: any }) {
    if (!object.email) throw CustomError.badRequest("Missing email for user");

    const [error, userFromDbToResDto] = UserFromDb.create(object);

    if (error) throw CustomError.badRequest(error);

    const { email, name, address, lastname, phone } = userFromDbToResDto!;

    return new User(email, undefined, name, lastname, phone, address);
  }
}
