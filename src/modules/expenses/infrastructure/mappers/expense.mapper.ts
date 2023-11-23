import { AddExpenseDto } from "../../../../modules/expenses/domain/dtos";
import { CustomError } from "../../../../shared/domain/errors";
import { Expense } from "../../../../modules/expenses/domain/entities";

export class ExpenseMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static expenseEntityFromObject(object: { [key: string]: any }) {
    if (!object.id || !object._id)
      throw CustomError.badRequest("Missing id for expense");

    const [error, addExpenseDto] = AddExpenseDto.create(object);

    if (error) throw CustomError.badRequest(error);

    const { title, description, category, amount, type, date } = addExpenseDto!;
    return new Expense(
      object.id || object._id,
      title,
      description,
      category,
      date,
      type,
      amount
    );
  }
}
