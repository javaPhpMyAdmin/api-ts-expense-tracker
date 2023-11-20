import { UserEmailDto } from '.';

export class UserFromDb {
  private constructor(
    public email: string,
    public name: string,
    public lastname: string,
    public phone: number,
    public address: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UserFromDb?] {
    const {
      emailFromDb,
      nameFromDb,
      passwordFromDb,
      lastnameFromDb,
      phoneFromDb,
      addressFromDb,
    } = object;

    if (!nameFromDb) return ['Missing name'];
    if (!emailFromDb) return ['Missing email'];
    if (!phoneFromDb) return ['Missing phone'];
    if (!addressFromDb) return ['Missing address'];
    if (!lastnameFromDb) return ['Missing lastname'];

    return [
      undefined,
      new UserFromDb(
        emailFromDb,
        nameFromDb,
        lastnameFromDb,
        phoneFromDb,
        addressFromDb
      ),
    ];
  }
}
