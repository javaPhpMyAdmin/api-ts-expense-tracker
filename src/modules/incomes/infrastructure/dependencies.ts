import { AddIncome, GetAllIncomes, GetIncomeById } from "../aplication";
import { IncomeController } from "./api/income.controller";
import { logger } from "../../../shared/infrastructure/dependencies";
import { IncomeDataSourceImpl } from "./datasources/mockDataSource/mockIncome.datasource.impl";
import { IncomeRepositoryImpl } from "./income.repository.impl";

const mockIncomeDataSource = new IncomeDataSourceImpl();
const incomeRepository = new IncomeRepositoryImpl(mockIncomeDataSource);
const getAllIncomes = new GetAllIncomes(incomeRepository, logger);
const getIncomeById = new GetIncomeById(incomeRepository, logger);
const addIncome = new AddIncome(incomeRepository, logger);
export const incomeController = new IncomeController(
  getAllIncomes,
  getIncomeById,
  addIncome
);
