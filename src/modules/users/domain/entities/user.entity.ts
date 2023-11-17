export class User {
  constructor(
    private readonly id: string,
    private readonly email: string,
    private readonly password: string | undefined,
    private readonly name: string,
    private readonly lastname: string,
    private readonly phone: number,
    private readonly address: string
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
  public get getPhone(): number {
    return this.phone;
  }
  public get getAddress(): string {
    return this.address;
  }
}
