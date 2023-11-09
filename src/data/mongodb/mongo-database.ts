import { logger } from "../../shared/infrastructure/dependencies";
import { error } from "console";
import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName?: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { dbName, mongoUrl } = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });
      logger.info("[SUCCESS] - CONNECTED TO MONGO_DB");
      return true;
    } catch (e) {
      logger.error("[ERROR] - UNABLE TO CONNECT TO MONGO_DB");
      throw error;
    }
  }
}
