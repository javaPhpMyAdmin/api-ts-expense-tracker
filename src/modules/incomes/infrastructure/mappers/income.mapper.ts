import { CustomError } from "../../../../shared/domain/errors";
import { AddIncomeDto } from "../../domain/dtos";
import { Income } from "../../domain/entities";

export class IncomeMapper {
  static incomeEntityFromObject(object: { [key: string]: any }) {
    if (!object.id || !object._id)
      throw CustomError.badRequest("Missing id for income");

    const [error, addIncomeDto] = AddIncomeDto.create(object);

    if (error) throw CustomError.badRequest(error);

    const { title, description, category, amount, type, date } = addIncomeDto!;

    return new Income(
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
