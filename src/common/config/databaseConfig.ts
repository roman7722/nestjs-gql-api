import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { Dialect } from 'sequelize/types';
import { IDatabaseConfig } from './interfaces/IDatabase';

console.log(
  `\n--------------------------------------- NODE_ENV =`,
  process.env.NODE_ENV,
  ` ---------------------------------------\n`,
);

switch (process.env.NODE_ENV) {
  case 'develop':
    dotenv.config({ path: resolve(__dirname, '../../../.env.develop') });
    break;

  case 'production':
    dotenv.config({ path: resolve(__dirname, '../../../.env.production') });
    break;

  default:
    dotenv.config({ path: resolve(__dirname, '../../../.env.production') });
    break;
}

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
} = process.env;

export const databaseConfig: IDatabaseConfig = {
  develop: {
    username: POSTGRES_USER || '',
    password: POSTGRES_PASSWORD || '',
    database: POSTGRES_DB || '',
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 5432,
    dialect: DB_DIALECT as Dialect,
  },
  production: {
    username: POSTGRES_USER || '',
    password: POSTGRES_PASSWORD || '',
    database: POSTGRES_DB || '',
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 5432,
    dialect: DB_DIALECT as Dialect,
  },
  test: {
    username: POSTGRES_USER || '',
    password: POSTGRES_PASSWORD || '',
    database: POSTGRES_DB || '',
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 5432,
    dialect: DB_DIALECT as Dialect,
  },
};
