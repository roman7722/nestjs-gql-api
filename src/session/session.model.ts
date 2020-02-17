import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from '../user/user.model';

@Table({ tableName: 'session' })
export default class Session extends Model<Session> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  /** Many-to-one */
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
  @BelongsTo(() => User) user: User;

  @Column({ allowNull: false }) refreshToken: string;
  @Column({ allowNull: false }) expiresIn: number;
  @Column({ allowNull: false }) fingerprint: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;
}
