import { UserEmailDto } from '../../../../modules/users/domain';

export class GoogleRegisterDto {
  private constructor(
    public email: string,
    public name: string,
    public lastname: string,
    public phone?: number,
    public address?: string,
    public imageProfile?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, GoogleRegisterDto?] {
    const { email, name, lastname, phone, address, imageProfile } = object;

    if (!name) return ['Missing name '];
    if (!email) return ['Missing email'];
    if (!lastname) return ['Missing lastname'];
    if (!imageProfile) return ['Missing image profile'];

    //check valid email
    const [error, emailDto] = UserEmailDto.execute(email)!;
    if (error) return [`${error}`];

    return [
      undefined,
      new GoogleRegisterDto(
        emailDto!.email,
        name,
        lastname,
        phone,
        address,
        imageProfile
      ),
    ];
  }
}
