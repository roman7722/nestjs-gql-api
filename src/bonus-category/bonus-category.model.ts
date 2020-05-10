import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Bonus from '../bonus/bonus.model';
import EmployeeBonus from '../employee-bonus/employee-bonus.model';

@Table({ tableName: 's_bonus_category' })
export default class BonusCategory extends Model<BonusCategory> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) bonusCategoryName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => Bonus) bonuses: Bonus[];
  @HasMany(() => EmployeeBonus) employeeBonuses: EmployeeBonus[];
}
