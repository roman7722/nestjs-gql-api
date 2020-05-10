import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import District from '../district/district.model';

@Table({ tableName: 's_quarter' })
export default class Quarter extends Model<Quarter> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) quarterName: string;

  /** Many-to-one */
  @ForeignKey(() => District)
  @Column({ allowNull: false })
  districtId: number;
  @BelongsTo(() => District) district: District;

  @Column({ allowNull: false, defaultValue: 1 }) version: number;
}
