import { UserFromDb } from "../../../../modules/users/domain/dtos";
import { CustomError } from "../../../../shared/domain";
import { User } from "../../domain";

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
      imageProfile: imageProfileFromDb,
    } = object;

    const [error, userFromDbToResDto] = UserFromDb.create({
      emailFromDb,
      nameFromDb,
      addressFromDb,
      phoneFromDb,
      lastnameFromDb,
      imageProfileFromDb,
    });

    if (error) throw CustomError.badRequest(error);

    const { email, name, address, lastname, phone, imageProfile } =
      userFromDbToResDto!;

    return new User(
      object._id || object.id,
      email,
      undefined, //IS A GOOD PRACTICE DON'T RETURN THE PASSWORD TO DE CLIENT
      name,
      lastname,
      phone,
      address,
      imageProfile
    );
  }
}
