import { map } from 'lodash';
import {
  AfterCreate, AfterFind, AfterUpdate, BelongsTo, Column, ForeignKey, HasMany, Model, Table,
} from 'sequelize-typescript';
import User from '../user/user.model';

@Table({ tableName: 'agreement' })
export default class Agreement extends Model<Agreement> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) numAgreement: string;

  @AfterFind
  @AfterCreate
  @AfterUpdate
  static passwordHide(instance: User) {
      map(instance, dataValues => (dataValues.user.dataValues.password = null));
  }

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
  @BelongsTo(() => User) user: User;

  @Column({ allowNull: false }) dateAgreement: Date;
  @Column({ allowNull: true }) rem: string;
}
