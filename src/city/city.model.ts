import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 's_city' })
export default class City extends Model<City> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) cityName: string;
}
