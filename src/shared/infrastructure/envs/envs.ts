import '../../../shared/infrastructure/envs/load-env-vars';
const API_VERSION_PREFIX = '/api/v1';
const API_VERSION_PREFIX_AUTH = `${API_VERSION_PREFIX}/auth`;
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  API_VERSION_PREFIX,
  API_VERSION_PREFIX_AUTH,
  DB_NAME: get('MONGO_DBNAME').required().asString(),
  TOKEN_EXPIRATES_IN: get('TOKEN_EXPIRATES_IN').required().asString(),
  TOKEN_SECRET_KEY: get('TOKEN_SECRET_KEY').required().asString(),
  REFRESH_TOKEN_SECRET_KEY: get('REFRESH_TOKEN_SECRET_KEY')
    .required()
    .asString(),
  GOOGLE_CLIENT_ID: get('GOOGLE_CLIENT_ID').required().asString(),
};
