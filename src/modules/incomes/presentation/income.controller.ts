import { Request, Response } from "express";
import { AddIncome, GetAllIncomes, GetIncomeById } from "../aplication";
import { AddIncomeDto } from "../domain/dtos/addIncome.dto";
import { CustomError } from "../../../shared/domain/errors";
import { Logger } from "../../../shared/domain/logger";
import { User } from "modules/users/domain";
export class IncomeController {
  constructor(
    private readonly getAllIncomes: GetAllIncomes,
    private readonly getIncomeById: GetIncomeById,
    private readonly addIncome: AddIncome,
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

  getIncomesForUserId = (req: Request, res: Response) => {
    console.log("USER MIDDLEWARE", req.body.user);
    const userId = req.body.user.id;
    // const userId = req.params.userId;
    this.getAllIncomes
      .getAllIncomes(userId)
      .then((incomes) => {
        res.status(200).send({ incomes: incomes });
      })
      .catch((e) => this.handleError(e, res));
  };

  getIncomesById(req: Request, res: Response) {
    const { incomeId } = req.params;

    this.getIncomeById
      .getIncomeById(incomeId)
      .then((income) => res.status(200).send({ income: income }))
      .catch((e) => this.handleError(e, res));
  }

  registerIncome(req: Request, res: Response) {
    const [error, addIncomeDto] = AddIncomeDto.create(req.body);

    if (error) return res.status(400).send({ error: error });

    const userId = req.body.user.id;
    console.log("USER ID", userId);

    this.addIncome
      .registerIncome(addIncomeDto!, userId)
      .then((income) => res.status(201).json({ income: income! }))
      .catch((e) => this.handleError(e, res));
  }

  async deleteIncome(req: Request, res: Response) {
    const { id } = req.params;
    try {
      res.status(200).send({ message: "Income deleted successfully" });
    } catch (e) {
      this.handleError(e, res);
    }
  }
}
