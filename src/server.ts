import { App } from './shared/presentation';
import { logger } from './shared/infrastructure/dependencies';
import { envs } from './shared/infrastructure/envs';
import './shared/infrastructure/envs/load-env-vars';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

// process.on('unhandledRejection', (reason, promise) => {
//   logger.error(
//     `[ERROR] - APP EXITING DUE TO AN UNHANDLED PROMISE: ${promise} AND REASON: ${reason}`
//   );
//   // lets throw the error and let the uncaughtException handle below handle it
//   throw reason;
// });

// process.on('uncaughtException', (error) => {
//   logger.error(
//     `[ERROR] - APP EXITING DUE TO AN UNCAUGHT EXCEPTION: ${error.message}`
//   );
//   process.exit(ExitStatus.Failure);
// });

(async (): Promise<void> => {
  try {
    const app = new App(envs.PORT);
    app.init();
    app.start();

    // const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    // for (const exitSignal of exitSignals) {
    //   process.on(exitSignal, async () => {
    //     try {
    //       await app.close();
    //       logger.info('[EXITED] - APP EXITED WITH SUCCESS');
    //       process.exit(ExitStatus.Success);
    //     } catch (error) {
    //       logger.error(`[EXITED] - APP EXITED WITH ERROR: ${error}`);
    //       // process.exit(ExitStatus.Failure);
    //     }
    //   });
    // }
  } catch (error) {
    logger.error(`[EXITED] - APP EXITED WITH ERROR: ${error}`);
    // process.exit(ExitStatus.Failure);
  }
})();
