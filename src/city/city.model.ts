import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import District from '../district/district.model';

@Table({ tableName: 's_city' })
export default class City extends Model<City> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) cityName: string;

  @HasMany(() => District) cities: District[];
}
