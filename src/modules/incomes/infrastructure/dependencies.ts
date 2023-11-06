import { logger } from "../../../shared/infrastructure/dependencies";
import { GetAllIncomes, GetIncomeById } from "../aplication";
import { IncomeController } from "./api/income.controller";
import { MockIncomeRepository } from "./income-repository/mock-income-repository";

const incomeRepository = new MockIncomeRepository();
const getAllIncomes = new GetAllIncomes(incomeRepository, logger);
const getIncomeById = new GetIncomeById(incomeRepository, logger);
export const incomeController = new IncomeController(
  getAllIncomes,
  getIncomeById
);
