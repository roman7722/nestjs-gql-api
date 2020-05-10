import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Employee from '../employee/employee.model';
import Position from '../position/position.model';
import User from '../user/user.model';

@Table({ tableName: 'employee_position', timestamps: true })
export default class EmployeePosition extends Model<EmployeePosition> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  /** Many-to-one */
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
  @BelongsTo(() => User) user: User;

  /** Many-to-one */
  @ForeignKey(() => Employee)
  @Column({ allowNull: false })
  employeeId: number;
  @BelongsTo(() => Employee) employee: Employee;

  @Column({ allowNull: false }) positionDateStart: Date;
  @Column({ allowNull: false }) positionDateEnd: Date;

  /** Many-to-one */
  @ForeignKey(() => Position)
  @Column({ allowNull: false })
  positionId: number;
  @BelongsTo(() => Position) position: Position;

  @Column({ allowNull: false, type: DataType.DOUBLE }) tariff: number;

  @Column({ allowNull: true }) rem: string;

  @Column({ allowNull: false, defaultValue: 1 }) version: number;
  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;
}
