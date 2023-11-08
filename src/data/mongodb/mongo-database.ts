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
      console.log("[SUCCESS] - Connected to MongoDB");
      return true;
    } catch (e) {
      console.log("[ERROR] - Unable to connect to Mongo");
      throw error;
    }
  }
}
