import { ConsoleLogger } from "../../../shared/infrastructure";
import {
  RegisterUser,
  UserLogin,
  GetAllUsers,
  GetUserByEmail,
  UpdateUser,
  DeleteUser,
} from "../aplication";
import { UserController } from "../presentation";
import { MockDataSourceImpl, MongoDataSourceImpl } from "./datasources";
import { UserRepositoryImpl } from "./repositories";

//LOGGER INSTANCE
const logger = new ConsoleLogger();

//MOCK USER DATASOURCE
const mockUserDataSource = new MockDataSourceImpl();
//MONGO USER DATASOURCE
const mongoDataSource = new MongoDataSourceImpl();

//USER REPOSITORY --- HERE WE CAN SWITCH AND INJECT DIFERENTS DATASOURCES
export const userRepository = new UserRepositoryImpl(mongoDataSource);

//USE CASES INSTANCES//
//REGISTER USER USECASE
const registerUserUseCase = new RegisterUser(userRepository, logger);

//LOGIN USER USECASE
const loginUserUseCase = new UserLogin(userRepository, logger);

//GET ALL USERS USECASE
const getAllUsersUseCase = new GetAllUsers(userRepository, logger);

//GET USER BY EMAIL USECASE
const getUserByEmailUseCase = new GetUserByEmail(userRepository, logger);

//UPDATE USER USECASE
const updateUserUseCase = new UpdateUser(userRepository, logger);

//DELETE USER USECASE
const deleteUserUseCase = new DeleteUser(userRepository, logger);

//USER CONTROLLER INSTANCE
export const userController = new UserController(
  registerUserUseCase,
  loginUserUseCase,
  getAllUsersUseCase,
  getUserByEmailUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  logger
);
