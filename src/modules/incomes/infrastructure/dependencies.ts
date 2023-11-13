import { ConsoleLogger } from '../../../shared/infrastructure';
import { AddIncome, GetAllIncomes, GetIncomeById } from '../aplication';
import { IncomeController } from '../presentation';
import { IncomeDataSourceImpl, MongoDataSourceImpl } from './datasources';
import { IncomeRepositoryImpl } from './repositories';

//LOGGER INSTANCE
const logger = new ConsoleLogger();

//CREATE INCOME DATASOURCES
const mockIncomeDataSource = new IncomeDataSourceImpl();
const incomeDataSource = new MongoDataSourceImpl();

//CREATE INCOME REPOSITORY
const incomeRepository = new IncomeRepositoryImpl(incomeDataSource);

//CREATE NECESSARY USES CASES FROM APLICATION
//GET ALL INCOMES USE CASE
const getAllIncomes = new GetAllIncomes(incomeRepository, logger);

//GET INCOME BY ID USE CASE
const getIncomeById = new GetIncomeById(incomeRepository, logger);

//ADD INCOME USE CASE
const addIncome = new AddIncome(incomeRepository, logger);

//CREATE AND EXPORT THE RESPECTIVE CONTROLLER TO MANAGE INCOME ROUTES
export const incomeController = new IncomeController(
  getAllIncomes,
  getIncomeById,
  addIncome,
  logger
);
