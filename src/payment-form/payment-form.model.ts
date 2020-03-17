import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Customer from '../customer/customer.model';

@Table({ tableName: 's_payment_form' })
export default class PaymentForm extends Model<PaymentForm> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) paymentFormName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => Customer) customers: Customer[];
}
