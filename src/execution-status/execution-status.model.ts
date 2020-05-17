import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import ServicePack from '../service-pack/service-pack.model';

@Table({ tableName: 's_execution_status' })
export default class ExecutionStatus extends Model<ExecutionStatus> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) executionStatusName: string;
  @Column({ allowNull: true }) style: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => ServicePack) servicePacks: ServicePack[];
}
