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
    const { emailOb, nameObj, lastnameObj, phoneObj, addressObj } = object;

    if (!nameObj) return ["Missing name"];
    if (!emailOb) return ["Missing email"];
    if (!phoneObj) return ["Missing phone"];
    if (!addressObj) return ["Missing address"];
    if (!lastnameObj) return ["Missing lastname"];

    return [
      undefined,
      new UserFromDb(emailOb, nameObj, lastnameObj, phoneObj, addressObj),
    ];
  }
}
