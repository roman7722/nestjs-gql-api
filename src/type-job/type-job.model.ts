import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import EmployeeTypeJob from '../employee-type-job/employee-type-job.model';
import Employee from '../employee/employee.model';

@Table({ tableName: 's_type_job' })
export default class TypeJob extends Model<TypeJob> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) typeJobName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** Many-to-many */
  @BelongsToMany(
    () => Employee,
    () => EmployeeTypeJob,
  )
  employees: Employee[];
  // employees: Array<Employee & { EmployeeTypeJob: EmployeeTypeJob }>;
}
