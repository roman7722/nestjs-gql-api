import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import City from '../city/city.model';
import District from '../district/district.model';
import EmployeeBonus from '../employee-bonus/employee-bonus.model';
import EmployeePosition from '../employee-position/employee-position.model';
import EmployeeStatus from '../employee-status/employee-status.model';
import EmployeeTypeJob from '../employee-type-job/employee-type-job.model';
import OperationMode from '../operation-mode/operation-mode.model';
import Quarter from '../quarter/quarter.model';
import TypeJob from '../type-job/type-job.model';
import User from '../user/user.model';

@Table({ tableName: 'employee', timestamps: true })
export default class Employee extends Model<Employee> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  /** Many-to-many */
  @BelongsToMany(() => TypeJob, () => EmployeeTypeJob)
  // tslint:disable-next-line: array-type
  typeJobs: Array<TypeJob & { EmployeeTypeJob: EmployeeTypeJob }>;

  /** Many-to-one */
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
  @BelongsTo(() => User) user: User;

  @Column({ allowNull: false }) firstName: string;
  @Column({ allowNull: true }) middleName: string;
  @Column({ allowNull: true }) secondName: string;
  @Column({ allowNull: true }) displayName: string;
  @Column({ allowNull: true }) hbDate: Date;

  /** Many-to-one */
  @ForeignKey(() => City)
  @Column({ allowNull: true })
  cityId: number;
  @BelongsTo(() => City) city: City;

  /** Many-to-one */
  @ForeignKey(() => District)
  @Column({ allowNull: true })
  districtId: number;
  @BelongsTo(() => District) district: District;

  /** Many-to-one */
  @ForeignKey(() => Quarter)
  @Column({ allowNull: true })
  quarterId: number;
  @BelongsTo(() => Quarter) quarter: Quarter;

  @Column({ allowNull: true }) street: string;
  @Column({ allowNull: true }) house: string;
  @Column({ allowNull: true }) apartment: string;
  @Column({ allowNull: true }) education: string;

  @Column({ allowNull: true }) phone: string;
  @Column({ allowNull: true }) email: string;
  @Column({ allowNull: true, unique: true }) passportNumber: string;
  @Column({ allowNull: true }) passportIssuedBy: string;

  /** Many-to-one */
  @ForeignKey(() => EmployeeStatus)
  @Column({ allowNull: true })
  employeeStatusId: number;
  @BelongsTo(() => EmployeeStatus) employeeStatus: EmployeeStatus;

  /** Many-to-one */
  @ForeignKey(() => OperationMode)
  @Column({ allowNull: true })
  operationModeId: number;
  @BelongsTo(() => OperationMode) operationMode: OperationMode;

  @Column({ allowNull: true }) rem: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;
  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;

  /** One-to-many */
  @HasMany(() => EmployeePosition) employeePositions: EmployeePosition[];
  @HasMany(() => EmployeeBonus) employeeBonuses: EmployeeBonus[];
}
