import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface Config {
  port: number;
  debugLogging: boolean;
  elasticHost: string;
}

const isDevMode = process.env.NODE_ENV === 'development';

export const config: Config = {
  port: +(process.env.PORT || 3000),
  debugLogging: isDevMode,
  elasticHost: process.env.ELASTIC_HOST,
};
