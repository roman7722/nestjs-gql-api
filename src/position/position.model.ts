import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import EmployeePosition from '../employee-position/employee-position.model';

@Table({ tableName: 's_position', timestamps: true })
export default class Position extends Model<Position> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) positionName: string;
  @Column({ allowNull: false, type: DataType.DOUBLE, defaultValue: 0 })
  tariff: number;
  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
  isCurrentOffer: boolean;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;
  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;

  /** One-to-many */
  @HasMany(() => EmployeePosition) employeePositions: EmployeePosition[];
}
