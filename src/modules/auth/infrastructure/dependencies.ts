import { ValidateToken } from "../aplication/useCases/validateToken";
import { AuthMiddleware } from "../presentation/middlewares";

const validateToken = new ValidateToken();

export const authMiddleware = new AuthMiddleware(validateToken);
