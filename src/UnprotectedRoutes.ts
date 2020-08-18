import Router from '@koa/router';
import { userController } from './Controller';

const unprotectedRouter = new Router();

unprotectedRouter.get('/user', userController.index);

export { unprotectedRouter };
