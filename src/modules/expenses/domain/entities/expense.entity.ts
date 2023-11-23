export class Expense {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly category: string,
    readonly date: string,
    readonly type: string,
    readonly amount: number
  ) {}
}
