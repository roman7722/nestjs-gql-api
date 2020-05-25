import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Agreement from '../agreement/agreement.model';
import ExecutionStatus from '../execution-status/execution-status.model';
import PaymentStatus from '../payment-status/payment-status.model';

// import WardService from '../ward-service/ward-service.model';

@Table({ tableName: 'service_pack', timestamps: true })
export default class ServicePack extends Model<ServicePack> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column({ allowNull: true }) agreementData: string;

  /** Many-to-one */
  @ForeignKey(() => Agreement)
  @Column({ allowNull: false })
  agreementId: number;
  @BelongsTo(() => Agreement) agreement: Agreement;

  @Column({ allowNull: true }) startDate: Date;
  @Column({ allowNull: true }) endDate: Date;

  @Column({ allowNull: true }) totalCost: number;
  @Column({ allowNull: true }) prepayment: number;
  @Column({ allowNull: true }) debt: number;

  /** Many-to-one */
  @ForeignKey(() => ExecutionStatus)
  @Column({ allowNull: false })
  executionStatusId: number;
  @BelongsTo(() => ExecutionStatus) executionStatus: ExecutionStatus;

  /** Many-to-one */
  @ForeignKey(() => PaymentStatus)
  @Column({ allowNull: false })
  paymentStatusId: number;
  @BelongsTo(() => PaymentStatus) paymentStatus: PaymentStatus;

  @Column({ allowNull: true }) rem: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;
  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;

  /** One-to-many */
  // @HasMany(() => WardService) wardServices: WardService[];
}
