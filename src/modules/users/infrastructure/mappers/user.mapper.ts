import { Document } from "mongoose";
import { UserFromDb } from "../../../../modules/users/domain/dtos";
import { CustomError } from "../../../../shared/domain";
import { User, UserDto } from "../../domain";

export class UserMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static userEntityFromObject<Document>(object: Document): User | null {
    if (!object) throw CustomError.badRequest("Missing email for user");

    const {
      email: emailOb,
      name: nameObj,
      lastname: lastnameObj,
      phone: phoneObj,
      address: addressObj,
    } = object as unknown as {
      email: string;
      name: string;
      address: string;
      lastname: string;
      phone: number;
    };

    const [error, userFromDbToResDto] = UserFromDb.create({
      emailOb,
      nameObj,
      addressObj,
      phoneObj,
      lastnameObj,
    });

    if (error) throw CustomError.badRequest(error);

    const { email, name, address, lastname, phone } = userFromDbToResDto!;

    return new User(email, undefined, name, lastname, phone, address);
  }
}
