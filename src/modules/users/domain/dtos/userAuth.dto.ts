export class UserForTokenDto {
  constructor(public readonly email: string) {}

  static create(emailToValid: string): [string?, UserForTokenDto?] {
    return [undefined, new UserForTokenDto(emailToValid)];
  }
}
