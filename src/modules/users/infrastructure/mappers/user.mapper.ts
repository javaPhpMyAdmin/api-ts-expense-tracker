import { UserFromDb } from "../../../../modules/users/domain/dtos";
import { CustomError } from "../../../../shared/domain";
import { User, UserDto } from "../../domain";

export class UserMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static userEntityFromObject(object: { [key: string]: any }): User | null {
    if (!object.email || !object._id)
      throw CustomError.badRequest("Missing email or id for user");

    const {
      email: emailFromDb,
      name: nameFromDb,
      lastname: lastnameFromDb,
      phone: phoneFromDb,
      address: addressFromDb,
    } = object;
    // } = object as unknown as {
    //   email: string;
    //   name: string;
    //   address: string;
    //   lastname: string;
    //   phone: number;
    // };

    const [error, userFromDbToResDto] = UserFromDb.create({
      emailFromDb,
      nameFromDb,
      addressFromDb,
      phoneFromDb,
      lastnameFromDb,
    });

    if (error) throw CustomError.badRequest(error);

    const { email, name, address, lastname, phone } = userFromDbToResDto!;

    return new User(
      object._id || object.id,
      email,
      undefined, //NO NECESARY RETURN A PASSWORD TO THE FRONT
      name,
      lastname,
      phone,
      address
    );
  }
}
