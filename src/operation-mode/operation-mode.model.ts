import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Employee from '../employee/employee.model';

@Table({ tableName: 's_operation_mode' })
export default class OperationMode extends Model<OperationMode> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) operationModeName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => Employee) employees: Employee[];
}
