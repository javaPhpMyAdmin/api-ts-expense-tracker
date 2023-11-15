const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
);
export class UserEmailDto {
  constructor(public readonly email: string) {}

  static create(emailToValid: string): [string?, UserEmailDto?] {
    if (!emailToValid) return ["Missing email"];

    //Regex to validate email
    if (!emailRegex.test(emailToValid)) return ["Invalid email"];

    return [undefined, new UserEmailDto(emailToValid)];
  }
}
