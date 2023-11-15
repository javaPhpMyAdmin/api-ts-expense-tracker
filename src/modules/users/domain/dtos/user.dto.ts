import { Document } from "mongoose";
import { UserEmailDto } from ".";

export class UserDto {
  private constructor(
    public emailDto: string,
    public password: string,
    public name: string,
    public lastname: string,
    public phone: number,
    public address: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UserDto?] {
    const { email, password, name, lastname, phone, address } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!password) return ["Missing password DTO"];
    if (!phone) return ["Missing phone"];
    if (!address) return ["Missing address"];

    //check valid email
    const [error, emailDto] = UserEmailDto.create(email);
    if (error) return [`${error}`];

    //check length of password
    if (password.length < 5) return ["Invalid password, too short"];
    if (password.length > 15) return ["Invalid password, too long"];

    return [
      undefined,
      new UserDto(emailDto!.email, password, name, lastname, phone, address),
    ];
  }
}
