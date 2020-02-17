import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Ward from '../ward/ward.model';

@Table({ tableName: 's_family_status' })
export default class FamilyStatus extends Model<FamilyStatus> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) familyStatusName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => Ward) users: Ward[];
}
