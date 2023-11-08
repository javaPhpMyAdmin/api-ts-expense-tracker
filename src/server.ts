import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "./shared/infrastructure/envs/load-env-vars";
import { envs } from "./shared/infrastructure/envs";
import { incomeRouter } from "./modules/incomes/presentation";
import { MongoDatabase } from "./data/mongodb";

async function boostrap() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: ["*"],
    })
  );

  app.use(`${envs.API_VERSION}`, incomeRouter);

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
    console.log(`-------------------------------------------------`);
    console.log(`[SUCCESS] - SERVER RUNNING ON PORT ${envs.PORT}`);
    console.log(`-------------------------------------------------`);
  });
}

boostrap();
