import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "./shared/infrastructure/load-env-vars";
import incomeRouter from "./modules/incomes/infrastructure/api/income.router";
import config from "./shared/infrastructure/config";

async function connectToMongoDb(connectionString: string) {
  await mongoose.connect(connectionString);
  console.log("Database is connected");
}

function boostrap() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: ["*"],
    })
  );
  // app.use("/", (req, res) => {
  //   res.status(200).send("TESTING APP WORKS");
  // });
  app.use("/api/v1", incomeRouter);
  app.use(cookieParser());

  try {
    connectToMongoDb(config.MONGO_DB_CONNECTION!);
  } catch (e) {
    console.log("Error connecting to MongoDB ", e);
  }

  app.listen(config.PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${config.PORT}`);
  });
}

boostrap();
