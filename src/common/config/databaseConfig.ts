import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { Dialect } from 'sequelize/types';
import { IDatabaseConfig } from './interfaces/IDatabase';

dotenv.config({ path: resolve(__dirname, '../../../.env') });

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
} = process.env;

export const databaseConfig: IDatabaseConfig = {
  dev: {
    username: DB_USERNAME || '',
    password: DB_PASSWORD || '',
    database: DB_DATABASE || '',
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 5432,
    dialect: DB_DIALECT as Dialect,
  },
  prod: {
    username: DB_USERNAME || '',
    password: DB_PASSWORD || '',
    database: DB_DATABASE || '',
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 5432,
    dialect: DB_DIALECT as Dialect,
  },
  test: {
    username: DB_USERNAME || '',
    password: DB_PASSWORD || '',
    database: DB_DATABASE || '',
    host: DB_HOST || '127.0.0.1',
    port: Number(DB_PORT) || 5432,
    dialect: DB_DIALECT as Dialect,
  },
};
