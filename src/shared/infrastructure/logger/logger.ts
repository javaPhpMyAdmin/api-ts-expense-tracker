import { Logger, Message } from "../../domain/logger/logger";
import pino from "pino";

const pinoLogger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      levelPrefix: "🚀",
    },
  },
});
export class ConsoleLogger implements Logger {
  info(message: Message): void {
    pinoLogger.info(message);
  }

  error(message: Message): void {
    pinoLogger.error(message);
  }
}
