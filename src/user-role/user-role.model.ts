import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import User from '../user/user.model';

@Table({ tableName: 's_user_role' })
export default class UserRole extends Model<UserRole> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) userRoleName: string;
  @Column({ allowNull: true }) userRoleDescription: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => User, { sourceKey: 'userRoleName', keyType: DataType.STRING })
  users: User[];
}
