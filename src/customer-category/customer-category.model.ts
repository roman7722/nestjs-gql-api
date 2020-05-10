import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Customer from '../customer/customer.model';

@Table({ tableName: 's_customer_category' })
export default class CustomerCategory extends Model<CustomerCategory> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) customerCategoryName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => Customer) customers: Customer[];
}
