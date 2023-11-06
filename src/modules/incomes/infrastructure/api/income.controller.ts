import { Request, Response } from "express";
import { GetAllIncomes, GetIncomeById } from "../../aplication";

export class IncomeController {
  constructor(
    private readonly getAllIncomes: GetAllIncomes,
    private readonly getIncomeById: GetIncomeById
  ) {}

  async getIncomes(req: Request, res: Response) {
    try {
      const incomes = await this.getAllIncomes.getAllIncomes();
      res.status(200).send({ incomes: incomes });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  }

  async getIncomesById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const income = await this.getIncomeById.getIncomeById(id);
      res.status(200).send({ income: income });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  }
}
