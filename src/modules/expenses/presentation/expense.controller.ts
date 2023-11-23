import { Request, Response } from "express";
import { AddExpense, GetAllExpenses, GetExpenseById } from "../aplication";
import { AddExpenseDto } from "../domain/dtos/addExpense.dto";
import { CustomError } from "../../../shared/domain/errors";
import { Logger } from "../../../shared/domain/logger";

export class ExpenseController {
  constructor(
    private readonly getAllExpenses: GetAllExpenses,
    private readonly getExpenseById: GetExpenseById,
    private readonly addExpense: AddExpense,
    private readonly logger: Logger
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      this.logger.error(error.message);
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    this.logger.error(String(error));

    res.status(500).json(CustomError.internalServer());
  };

  getExpensesForUserId = (req: Request, res: Response) => {
    const userId = req.body.user.id;
    // const userId = req.params.userId;
    this.getAllExpenses
      .getAllExpenses(userId)
      .then((expenses) => {
        res.status(200).send({ expenses });
      })
      .catch((e) => this.handleError(e, res));
  };

  getExpensesById(req: Request, res: Response) {
    const { expenseId } = req.params;

    this.getExpenseById
      .getExpenseById(expenseId)
      .then((expense) => res.status(200).send({ expense }))
      .catch((e) => this.handleError(e, res));
  }

  registerExpense(req: Request, res: Response) {
    const [error, addIncomeDto] = AddExpenseDto.create(req.body);

    if (error) return res.status(400).send({ error: error });

    const userId = req.body.user.id;

    this.addExpense
      .registerExpense(addIncomeDto!, userId)
      .then((expense) => res.status(201).json({ expense }))
      .catch((e) => this.handleError(e, res));
  }

  async deleteExpense(req: Request, res: Response) {
    const { id } = req.params;
    try {
      res.status(200).send({ message: "Expense deleted successfully" });
    } catch (e) {
      this.handleError(e, res);
    }
  }
}
