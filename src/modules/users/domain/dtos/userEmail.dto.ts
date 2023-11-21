const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
);
export class UserEmailDto {
  private constructor(public email: string) {}

  static execute(emailToValidate: string): [string?, UserEmailDto?] {
    if (!emailToValidate) return ["Missing email"];

    //Regex to validate email
    if (!emailRegex.test(emailToValidate)) return ["Invalid email"];

    return [undefined, new UserEmailDto(emailToValidate)];
  }
}
