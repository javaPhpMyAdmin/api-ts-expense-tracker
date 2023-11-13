export class UserLoginDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, UserLoginDto?] {
    const { email, password } = object;

    if (!email) return ['Missing email'];
    if (!password) return ['Missing password'];
    //TODO: Check Password field, large password for example
    //VALID EMAIL

    return [undefined, new UserLoginDto(email, password)];
  }
}
