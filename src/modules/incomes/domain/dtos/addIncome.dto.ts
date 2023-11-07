export class AddIncomeDto {
  private constructor(
    public title: string,
    public description: string,
    public category: string,
    public date: string,
    public type: string,
    public amount: number
  ) {}

  static create(object: { [key: string]: any }): [string?, AddIncomeDto?] {
    const { title, description, category, date, type, amount } = object;

    if (!title) return ["Missing title"];
    if (!description) return ["Missing description"];
    if (!category) return ["Missing category"];
    if (!date) return ["Missing date"];
    if (!type) return ["Missing type"];
    if (!amount) return ["Missing amount"];

    return [
      undefined,
      new AddIncomeDto(title, description, category, date, type, amount),
    ];
  }
}
