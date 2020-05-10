import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Agreement from '../agreement/agreement.model';

@Table({ tableName: 's_agreement_status' })
export default class AgreementStatus extends Model<AgreementStatus> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) agreementStatusName: string;
  @Column({ allowNull: true }) style: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => Agreement) agreements: Agreement[];
}
