import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import User from '../user/user.model';

@Table({ tableName: 's_user_role' })
export default class UserRole extends Model<UserRole> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  roleName: string;

  @HasMany(() => User)
  users: User[];
}
