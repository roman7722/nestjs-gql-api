import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Agreement from '../agreement/agreement.model';
import Token from '../token/token.model';
import UserRole from '../user-role/user-role.model';

@Table({ tableName: 's_user' })
export default class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: true }) firstName: string;
  @Column({ allowNull: true }) middleName: string;
  @Column({ allowNull: true }) secondName: string;
  @Column({ allowNull: true }) displayName: string;
  @Column({ allowNull: false, unique: true }) username: string;
  @Column({ allowNull: false }) passwordHash: string;
  @Column({ allowNull: true }) email: string;
  @Column({ allowNull: true }) phone: string;
  @Column({ allowNull: true }) rem: string;

  @ForeignKey(() => UserRole)
  @Column({ allowNull: false })
  roleId: number;

  @BelongsTo(() => UserRole) role: UserRole;
  @HasMany(() => Agreement) agreements: Agreement[];
  @HasMany(() => Token) tokens: Token[];
}
