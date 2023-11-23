import { ConsoleLogger } from "../../../shared/infrastructure";
import { AddExpense, GetAllExpenses, GetExpenseById } from "../aplication";
import { ExpenseController } from "../presentation";
import { MongoDataSourceImpl } from "./datasources/mongoDataSource";
import { ExpenseRepositoryImpl } from "./repositories";

//LOGER INSTANCE
const logger = new ConsoleLogger();

const mongoDataSource = new MongoDataSourceImpl();

//EXPENSE REPOSITORY INSTANCE
const expenseRepository = new ExpenseRepositoryImpl(mongoDataSource);

//REGISTER A NEW EXPENSE USE CASE
const addExpense = new AddExpense(expenseRepository, logger);

//GET ALL EXPENSES USE CASE
const getAllExpenses = new GetAllExpenses(expenseRepository, logger);

//GET EXPENSE BY ID USE CASE
const getExpenseById = new GetExpenseById(expenseRepository, logger);

export const expenseController = new ExpenseController(
  getAllExpenses,
  getExpenseById,
  addExpense,
  logger
);
