import { AuthUtility } from "../../../modules/auth/utils";
import { ValidateTokenUseCase } from "../aplication/useCases/validateToken";
import { AuthMiddleware } from "../presentation/middlewares";
import { GetUserByEmail } from "../aplication/useCases/getUser";
import { userRepository } from "../../../modules/users/infrastructure/dependencies";
import { AuthController } from "../presentation";
import {
  AuthRepositoryImpl,
  LoginUserUseCase,
  MockDataSourceImpl,
  MongoDataSourceImpl,
  RegisterUserUseCase,
  RefreshTokenUseCase,
} from "..";
import { ConsoleLogger } from "../../../shared/infrastructure";

//UTILITY FOR AUTHENTICATION
const authUtility = new AuthUtility();

//LOGGER INSTANCE
const logger = new ConsoleLogger();

//MOCK DATASOURCE FOR TESTING
const mockDatasource = new MockDataSourceImpl();

//MONGO DATASOURCE
const mongoDatasource = new MongoDataSourceImpl();

//AUTH REPOSITORY
const authRepository = new AuthRepositoryImpl(mongoDatasource);

//VALIDATE TOKEN USE CASE
const validateTokenUseCase = new ValidateTokenUseCase(authUtility);

//GET USER USE CASE
const getUser = new GetUserByEmail(authRepository);

//REFRESH TOKEN USE CASE
const refreshToken = new RefreshTokenUseCase(mongoDatasource, authUtility);

//MIDDLEWARE FOR AUTHENTICATION
export const authMiddleware = new AuthMiddleware(
  validateTokenUseCase,
  authUtility,
  getUser
);

//REGISTER USER USE CASE
const registerUser = new RegisterUserUseCase(
  authUtility,
  authRepository,
  logger
);

//LOGIN USER USE CASE
const loginUser = new LoginUserUseCase(authUtility, authRepository, logger);

//AUTH CONTROLLER INSTANCE
export const authController = new AuthController(
  loginUser,
  registerUser,
  refreshToken
);
