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
  develop: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
}
