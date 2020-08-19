import { Context } from 'koa';

import winston, { transports, format } from 'winston';

import { ElasticsearchTransport } from 'winston-elasticsearch';
import { Client } from '@elastic/elasticsearch';

import { config } from './Config';

const client = new Client({
  node: config.elastic.serverUrl,
  maxRetries: 5,
  requestTimeout: 60000,
});

const log = winston.createLogger({
  defaultMeta: { service: config.appName },
  level: config.debugLogging ? 'debug' : 'info',
  transports: [
    new ElasticsearchTransport({ client, level: 'info' }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

const logger = (): any => {
  return async (ctx: Context, next: () => Promise<any>): Promise<void> => {
    const start = new Date().getTime();

    await next();

    const ms = new Date().getTime() - start;

    let logLevel: string;
    if (ctx.status >= 500) {
      logLevel = 'error';
    } else if (ctx.status >= 400) {
      logLevel = 'warn';
    } else {
      logLevel = 'info';
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms - ${ctx.id}`;

    log.log(logLevel, msg);
  };
};

export { logger, log };
