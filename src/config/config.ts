import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGO_DB_CONNECTION: process.env.MONGO_URL,
};

export default config;
