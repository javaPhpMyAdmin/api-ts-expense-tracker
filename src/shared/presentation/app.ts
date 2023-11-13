import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { MongoDatabase } from '../../data/mongodb';
import { Application } from 'express';
import { envs } from '../infrastructure/envs';
import { Server } from 'http';
import { httpRouter, logger } from '../../shared/infrastructure/dependencies';

export class App {
  private server?: Server;
  public app?: Application;

  constructor(private port = 5001) {}

  public async init(): Promise<void> {
    this.setupExpress();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: ['*'],
      })
    );
    this.setupRouters();
  }

  public getApp(): Application {
    return this.app!;
  }

  private async databaseSetup(): Promise<void> {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.DB_NAME,
    });
  }

  public async close(): Promise<void> {
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
    }
  }

  private setupRouters(): void {
    httpRouter.setApplication(this.getApp());
  }

  public start(): void {
    this.server = this.app?.listen(this.port, () => {
      logger.info(`[SUCCESS] - SERVER RUNNING ON PORT ${envs.PORT}`);
    });
  }
}
