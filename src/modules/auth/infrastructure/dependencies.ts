import { AuthUtility } from "../../../modules/auth/utils";
import { ValidateToken } from "../aplication/useCases/validateToken";
import { AuthMiddleware } from "../presentation/middlewares";
import { GetUserByEmail } from "../aplication/useCases/getUser";
import { userRepository } from "../../../modules/users/infrastructure/dependencies";
import { AuthController } from "../presentation";
import { RegisterUserUseCase } from "..";
import { ConsoleLogger } from "../../../shared/infrastructure";

const validateToken = new ValidateToken();
const authUtility = new AuthUtility();

//LOGGER INSTANCE
const logger = new ConsoleLogger();

//GET USER USE CASE
const getUser = new GetUserByEmail(userRepository);

//MIDDLEWARE FOR AUTHENTICATION
export const authMiddleware = new AuthMiddleware(
  validateToken,
  authUtility,
  getUser
);
//REGISTER USER USE CASE
const registerUser = new RegisterUserUseCase(userRepository, logger);
export const authController = new AuthController(registerUser, authUtility);
