import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from '../user/user.model';

@Table({ tableName: 'session' })
export default class Token extends Model<Token> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
  @BelongsTo(() => User) user: User;
  @Column({ allowNull: false }) roleId: string;
  @Column({ allowNull: false }) refreshToken: string;
  @Column({ allowNull: false }) expiresIn: number;
  @Column({ allowNull: false }) fingerprint: string;
}
