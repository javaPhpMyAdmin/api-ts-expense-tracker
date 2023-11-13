import { UserEmailDto } from '.';

export class UserDto {
  private constructor(
    public emailDto: UserEmailDto,
    public password: string,
    public name: string,
    public lastname: string,
    public phone: number,
    public address: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UserDto?] {
    const { email, password, name, lastname, phone, address } = object;

    if (!name) return ['Missing name'];
    if (!email) return ['Missing email'];
    if (!password) return ['Missing password'];
    if (!phone) return ['Missing phone'];
    if (!address) return ['Missing address'];
    //TODO: VALIDATE PASSWORD AND EMAIL, LARGE PASSWORD
    const [error, emailDto] = UserEmailDto.create(email);
    if (error) return ['Invalid email'];

    return [
      undefined,
      new UserDto(emailDto!, password, name, lastname, phone, address),
    ];
  }
}
