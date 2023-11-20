import { UserEmailDto } from "../../../../modules/users/domain/dtos/userEmail.dto";

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];
    //check valid email
    const [error, emailDto] = UserEmailDto.execute(email)!;
    if (error) return [`${error}`];

    //check length of password
    if (password.length < 5) return ["Invalid password, too short"];
    if (password.length > 15) return ["Invalid password, too long"];

    return [undefined, new LoginUserDto(email, password)];
  }
}
