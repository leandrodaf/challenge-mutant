import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import { v1 as uuidV1 } from 'uuid';

import { logger, log } from './Logger';
import { config } from './Config';
import { unprotectedRouter } from './UnprotectedRoutes';

const app = new Koa();

app.use(async function (ctx, next) {
  ctx.id = uuidV1();
  await next();
});

app.use(helmet());

app.use(cors());

app.use(logger());

app.use(bodyParser());

app.use(unprotectedRouter.routes());

app.listen(config.port);

log.log('info', `Server running on port ${config.port}`);
