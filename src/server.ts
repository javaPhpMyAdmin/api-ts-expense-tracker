import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "./shared/infrastructure/load-env-vars";
import envs from "./shared/infrastructure/envs/envs";
import incomeRouter from "./modules/incomes/infrastructure/api/income.router";
import { MongoDatabase } from "./data/mongodb/mongo-database";

async function boostrap() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: ["*"],
    })
  );

  app.use("/api/v1", incomeRouter);

  app.use("/", (req, res) => {
    res.status(200).send("TESTING APP WORKS");
  });

  app.use(cookieParser());
  try {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
    });
  } catch (error) {
    console.log(error);
  }

  app.listen(envs.PORT, () => {
    console.log(`[SUCCESS] - SERVER RUNNING ON PORT ${envs.PORT}`);
  });
}

boostrap();
