import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Employee from '../employee/employee.model';
import TypeJob from '../type-job/type-job.model';

@Table({ tableName: 'employee_type_job', version: false })
export default class EmployeeTypeJob extends Model<EmployeeTypeJob> {
  @ForeignKey(() => Employee)
  @Column
  employeeId: number;

  @ForeignKey(() => TypeJob)
  @Column
  typeJobId: number;
}
