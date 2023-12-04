import '../../../shared/infrastructure/envs/load-env-vars';
const API_VERSION_PREFIX = '/api/v1';
const API_VERSION_PREFIX_AUTH = `${API_VERSION_PREFIX}/auth`;
import { get } from 'env-var';
// CLOUDINARY_CLOUD_NAME=dh27sb79z
// CLOUDINARY_API_KEY=529682691964224
// CLOUDINARY_API_SECRET=2vkTIbb9BEM65Aqj7Up5PRgnk0E
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
  GOOGLE_CLIENT_SECRET: get('GOOGLE_CLIENT_SECRET').required().asString(),
  CLOUDINARY_CLOUD_NAME: get('CLOUDINARY_CLOUD_NAME').required().asString(),
  CLOUDINARY_API_KEY: get('CLOUDINARY_API_KEY').required().asString(),
  CLOUDINARY_API_SECRET: get('CLOUDINARY_API_SECRET').required().asString(),
};
