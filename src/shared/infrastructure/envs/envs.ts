import { get } from "env-var";
const API_VERSION = "/api/v1";
export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  API_VERSION,
  DB_NAME: get("MONGO_DBNAME").required().asString(),
};
