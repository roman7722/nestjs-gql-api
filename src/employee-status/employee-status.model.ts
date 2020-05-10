import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 's_employee_status' })
export default class EmployeeStatus extends Model<EmployeeStatus> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) employeeStatusName: string;
  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
  isEmployeeGroup: boolean;
  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
  isTimesheetGroup: boolean;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  // @HasMany(() => Employee) employees: Employee[];
}
