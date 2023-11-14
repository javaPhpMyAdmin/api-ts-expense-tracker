import { UserEmailDto } from ".";

export class UserFromDb {
  private constructor(
    public email: string,
    public name: string,
    public lastname: string,
    public phone: number,
    public address: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UserFromDb?] {
    const { email, password, name, lastname, phone, address } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!phone) return ["Missing phone"];
    if (!address) return ["Missing address"];
    if (!lastname) return ["Missing lastname"];

    const [error, emailDto] = UserEmailDto.create(email);
    if (error) return ["Invalid email"];

    return [undefined, new UserFromDb(email, name, lastname, phone, address)];
  }
}
