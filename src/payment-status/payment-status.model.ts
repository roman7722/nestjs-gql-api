import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import ServicePack from '../service-pack/service-pack.model';

@Table({ tableName: 's_payment_status' })
export default class PaymentStatus extends Model<PaymentStatus> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) paymentStatusName: string;
  @Column({ allowNull: true }) style: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => ServicePack) servicePacks: ServicePack[];
}
