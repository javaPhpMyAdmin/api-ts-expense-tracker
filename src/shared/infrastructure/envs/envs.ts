import '../../../shared/infrastructure/envs/load-env-vars';
const API_VERSION_PREFIX = '/api/v1';
const API_VERSION_PREFIX_AUTH = `${API_VERSION_PREFIX}/auth`;
//COMMAND TO CREATE A SEED FOR A SECRET KEY TO USE WITH JWT TOKEN
//openssl rand -hex 32 //6c54fc4e7b05043f4a6fd7ec7fb43318072fdd57691701b6775ec1b98fd40039
export const envs = {
  PORT: Number(process.env.PORT),
  MONGO_URL: String(process.env.MONGO_URL),
  API_VERSION_PREFIX,
  API_VERSION_PREFIX_AUTH,
  DB_NAME: String(process.env.MONGO_DBNAME),
  TOKEN_EXPIRATES_IN: String(process.env.TOKEN_EXPIRATES_IN),
  TOKEN_SECRET_KEY: String(process.env.TOKEN_SECRET_KEY),
};
