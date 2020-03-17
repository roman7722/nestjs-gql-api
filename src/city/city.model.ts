import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Customer from '../customer/customer.model';
import District from '../district/district.model';
import Ward from '../ward/ward.model';

@Table({ tableName: 's_city' })
export default class City extends Model<City> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) cityName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => District) districts: District[];
  @HasMany(() => Ward) wards: Ward[];
  @HasMany(() => Customer) customers: Customer[];
}
