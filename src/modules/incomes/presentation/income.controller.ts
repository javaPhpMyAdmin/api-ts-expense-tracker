import { Request, Response } from "express";
import { AddIncome, GetAllIncomes, GetIncomeById } from "../aplication";
import { AddIncomeDto } from "../domain/dtos/addIncome.dto";

export class IncomeController {
  constructor(
    private readonly getAllIncomes: GetAllIncomes,
    private readonly getIncomeById: GetIncomeById,
    private readonly addIncome: AddIncome
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

  async registerIncome(req: Request, res: Response) {
    try {
      const [error, addIncomeDto] = AddIncomeDto.create(req.body);
      if (error) res.status(400).json({ error });

      const income = await this.addIncome.registerIncome(addIncomeDto!);
      res.json(income!);
    } catch (error) {
      res.status(500).json({ error });
      console.log("INSIDE CONTROLLER ERROR", error);
    }
  }

  async deleteIncome(req: Request, res: Response) {
    try {
      res.status(200).send({ message: "income deleted successfully" });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  }
}
