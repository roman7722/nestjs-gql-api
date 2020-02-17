import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import City from '../city/city.model';

@Table({ tableName: 's_district' })
export default class District extends Model<District> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) districtName: string;

  /** Many-to-one */
  @ForeignKey(() => City)
  @Column({ allowNull: false })
  cityId: number;
  @BelongsTo(() => City) city: City;

  @Column({ allowNull: false, defaultValue: 1 }) version: number;
}
