import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import City from '../city/city.model';

@Table({ tableName: 's_district' })
export default class District extends Model<District> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) districtName: string;

  @ForeignKey(() => City)
  @Column({ allowNull: false })
  cityId: number;
  @BelongsTo(() => City) city: City;
}
