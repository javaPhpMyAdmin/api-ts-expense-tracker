const emailRegex = new RegExp(
  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
  'gm'
);
export class UserEmailDto {
  constructor(public readonly email: string) {}

  static create(emailToValid: string): [string?, UserEmailDto?] {
    if (!emailToValid) return ['Missing email'];
    //Regex to validate email
    if (!emailRegex.test(emailToValid)) return ['Invalid email'];

    return [undefined, new UserEmailDto(emailToValid)];
  }
}
