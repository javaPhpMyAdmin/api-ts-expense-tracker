import { AddIncome, GetAllIncomes, GetIncomeById } from "../aplication";
import { IncomeController } from "../presentation";
import { logger } from "../../../shared/infrastructure/dependencies";
import { IncomeDataSourceImpl, MongoDataSourceImpl } from "./datasources";
import { IncomeRepositoryImpl } from "./repositories";

//CREATE DATASOURCES
// const mockIncomeDataSource = new IncomeDataSourceImpl();
const incomeDataSource = new MongoDataSourceImpl();
//CREATE REPOSITORY
const incomeRepository = new IncomeRepositoryImpl(incomeDataSource);
//CREATE NECESSARY USES CASES FROM APLICATION
const getAllIncomes = new GetAllIncomes(incomeRepository, logger);
const getIncomeById = new GetIncomeById(incomeRepository, logger);
const addIncome = new AddIncome(incomeRepository, logger);
//CREATE AND EXPORT THE RESPECTIVE CONTROLLER TO MANAGE INCOME ROUTES
export const incomeController = new IncomeController(
  getAllIncomes,
  getIncomeById,
  addIncome
);
