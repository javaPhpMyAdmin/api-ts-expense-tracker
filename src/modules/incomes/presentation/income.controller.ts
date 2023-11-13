import { Request, Response } from 'express';
import { AddIncome, GetAllIncomes, GetIncomeById } from '../aplication';
import { AddIncomeDto } from '../domain/dtos/addIncome.dto';
import { CustomError } from '../../../shared/domain/errors';
import { Logger } from '../../../shared/domain/logger';
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

  getIncomes = (req: Request, res: Response) => {
    this.getAllIncomes
      .getAllIncomes()
      .then((incomes) => {
        res.status(200).send({ incomes: incomes });
      })
      .catch((e) => this.handleError(e, res));
  };

  getIncomesById(req: Request, res: Response) {
    const { id } = req.params;

    this.getIncomeById
      .getIncomeById(id)
      .then((income) => res.status(200).send({ income: income }))
      .catch((e) => this.handleError(e, res));
  }

  registerIncome(req: Request, res: Response) {
    const [error, addIncomeDto] = AddIncomeDto.create(req.body);

    if (error) res.status(400).send({ error: error });

    this.addIncome
      .registerIncome(addIncomeDto!)
      .then((income) => res.status(200).json(income!))
      .catch((e) => this.handleError(e, res));
  }

  async deleteIncome(req: Request, res: Response) {
    try {
      res.status(200).send({ message: 'income deleted successfully' });
    } catch (e) {
      this.handleError(e, res);
    }
  }
}
