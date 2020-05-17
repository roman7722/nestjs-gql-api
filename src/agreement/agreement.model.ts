import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import AgreementStatus from '../agreement-status/agreement-status.model';
import Customer from '../customer/customer.model';
import ServicePack from '../service-pack/service-pack.model';
import User from '../user/user.model';
import Ward from '../ward/ward.model';

@Table({ tableName: 'agreement', timestamps: true })
export default class Agreement extends Model<Agreement> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) agreementNumber: string;
  @Column({ allowNull: false }) agreementDate: Date;

  /** Many-to-one */
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
  @BelongsTo(() => User) user: User;

  /** Many-to-one */
  @ForeignKey(() => Customer)
  @Column({ allowNull: false })
  customerId: number;
  @BelongsTo(() => Customer) customer: Customer;

  /** Many-to-one */
  @ForeignKey(() => Ward)
  @Column({ allowNull: false })
  wardId: number;
  @BelongsTo(() => Ward) ward: Ward;

  /** Many-to-one */
  @ForeignKey(() => AgreementStatus)
  @Column({ allowNull: false })
  agreementStatusId: number;
  @BelongsTo(() => AgreementStatus) agreementStatus: AgreementStatus;

  @Column({ allowNull: true }) rem: string;

  @Column({ allowNull: false, defaultValue: 1 }) version: number;
  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;

  /** One-to-many */
  @HasMany(() => ServicePack) servicePacks: ServicePack[];
}
