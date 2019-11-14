import { Dialect } from 'sequelize/types';

export interface IDatabaseConfigAttributes {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

export interface IDatabaseConfig {
  dev: IDatabaseConfigAttributes;
  prod: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
}
