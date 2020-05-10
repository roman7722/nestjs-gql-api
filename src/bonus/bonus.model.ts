import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import BonusCategory from '../bonus-category/bonus-category.model';
import EmployeeBonus from '../employee-bonus/employee-bonus.model';

@Table({ tableName: 's_bonus', timestamps: true })
export default class Bonus extends Model<Bonus> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  /** Many-to-one */
  @ForeignKey(() => BonusCategory)
  @Column({ allowNull: false })
  bonusCategoryId: number;
  @BelongsTo(() => BonusCategory) bonusCategory: BonusCategory;

  @Column({ allowNull: false, unique: true }) bonusName: string;
  @Column({ allowNull: false, type: DataType.DOUBLE, defaultValue: 0 })
  cost: number;
  @Column({ allowNull: true }) rem: string;
  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
  isCurrentOffer: boolean;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;
  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;

  /** One-to-many */
  @HasMany(() => EmployeeBonus) employeeBonuses: EmployeeBonus[];
}
