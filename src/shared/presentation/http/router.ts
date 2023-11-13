import { Application } from 'express';
import { envs } from '../../infrastructure/envs';
import { incomeRouter } from '../../../modules/incomes/presentation';
import { UserRoutes } from '../../../modules/users/presentation';

export class HTTPRouter {
  constructor() {}

  setApplication(app: Application) {
    //INCOMES ROUTES
    app?.use(`${envs.API_VERSION_PREFIX}`, incomeRouter);
    //EXPENSES ROUTES
    // this.app?.use(`${envs.API_VERSION_PREFIX}`, ExpenseRouter.routes);
    //AUTH ROUTES
    app?.use(`${envs.API_VERSION_PREFIX_AUTH}`, UserRoutes.routes);
    //USER ROUTES WITHOUT AUTH PREFIX
    app?.use(`${envs.API_VERSION_PREFIX}`, UserRoutes.routes);
    //NOT FOUND ROUTES
    app?.use('/', (req, res) => {
      res.status(200).send('IT WORKS');
    });
  }
}
