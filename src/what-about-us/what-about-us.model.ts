import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Customer from '../customer/customer.model';

@Table({ tableName: 's_what_about_us' })
export default class WhatAboutUs extends Model<WhatAboutUs> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) whatAboutUsName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => Customer) customers: Customer[];
}
