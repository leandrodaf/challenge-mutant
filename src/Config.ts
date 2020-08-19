import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface Elastic {
  serviceName: string;
  serverUrl: string;
  logLevel: string;
}

export interface Config {
  port: number;
  debugLogging: boolean;
  elastic: Elastic;
  appName: string;
}

const isDevMode = process.env.NODE_ENV === 'development';

export const config: Config = {
  appName: process.env.APP_NAME || 'challenge-mutant',
  port: +(process.env.PORT || 3000),
  debugLogging: isDevMode,
  elastic: {
    serviceName: process.env.ELASTIC_NAME || 'challenge-mutant',
    serverUrl: process.env.ELASTIC_HOST,
    logLevel: process.env.ELASTIC_LOG_LEVEL || 'info',
  },
};
