import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import winston from "winston";

import { logger } from "./Logger";
import { config } from './Config';
import { unprotectedRouter } from './UnprotectedRoutes';

const app = new Koa();

app.use(helmet());

app.use(cors());

app.use(logger(winston));

app.use(bodyParser());

app.use(unprotectedRouter.routes());

app.listen(config.port);

console.log(`Server running on port ${config.port}`);
