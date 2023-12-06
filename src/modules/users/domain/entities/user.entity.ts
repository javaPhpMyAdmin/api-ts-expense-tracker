export class User {
  constructor(
    private readonly id: string,
    private readonly email: string,
    private readonly password: string | undefined,
    private readonly name: string,
    private readonly lastname: string,
    private readonly phone?: number,
    private readonly address?: string,
    private readonly imageProfile?: string
  ) {}
  public get getId(): string {
    return this.id;
  }
  public get getEmail(): string {
    return this.email;
  }
  public get getPassword(): string | undefined {
    return this.password;
  }
  public get getName(): string {
    return this.name;
  }
  public get getLastname(): string {
    return this.lastname;
  }
  public get getPhone(): number | undefined {
    return this.phone;
  }
  public get getAddress(): string | undefined {
    return this.address;
  }

  public get getImageProfile(): string {
    return this.imageProfile!;
  }
}
