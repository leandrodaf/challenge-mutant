import { Context } from 'koa';
import { transports, format } from 'winston';
import { config } from './Config';

const logger = (winstonInstance: any): any => {
  winstonInstance.configure({
    level: config.debugLogging ? 'debug' : 'info',
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
    ],
  });

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

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

    winstonInstance.log(logLevel, msg);
  };
};

export { logger };
