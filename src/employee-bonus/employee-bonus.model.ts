import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import BonusCategory from '../bonus-category/bonus-category.model';
import Bonus from '../bonus/bonus.model';
import Employee from '../employee/employee.model';
import User from '../user/user.model';

@Table({ tableName: 'employee_bonus', timestamps: true })
export default class EmployeeBonus extends Model<EmployeeBonus> {
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

  @Column({ allowNull: false }) bonusDate: Date;

  /** Many-to-one */
  @ForeignKey(() => BonusCategory)
  @Column({ allowNull: false })
  bonusCategoryId: number;
  @BelongsTo(() => BonusCategory) bonusCategory: BonusCategory;

  /** Many-to-one */
  @ForeignKey(() => Bonus)
  @Column({ allowNull: false })
  bonusId: number;
  @BelongsTo(() => Bonus) bonus: Bonus;

  @Column({ allowNull: false, type: DataType.DOUBLE }) cost: number;
  @Column({ allowNull: true }) rem: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;
  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;
}
