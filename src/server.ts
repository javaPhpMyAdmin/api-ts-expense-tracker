import "./shared/infrastructure/envs/load-env-vars";
import { envs } from "./shared/infrastructure/envs";
import { App } from "./shared/presentation";
import { logger } from "./shared/infrastructure/dependencies";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on("unhandledRejection", (reason, promise) => {
  logger.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );
  // lets throw the error and let the uncaughtException handle below handle it
  throw reason;
});

process.on("uncaughtException", (error) => {
  logger.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

(async (): Promise<void> => {
  try {
    const app = new App(envs.PORT);
    app.init();
    app.start();

    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          await app.close();
          logger.info(`[EXITED] - APP EXITED WITH SUCCESS`);
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error(`[EXITED] - APP EXITED WITH ERROR: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      });
    }
  } catch (error) {
    logger.error(`[EXITED] - APP EXITED WITH ERROR: ${error}`);
    process.exit(ExitStatus.Failure);
  }
})();
