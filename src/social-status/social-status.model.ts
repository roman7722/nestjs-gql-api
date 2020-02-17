import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import WardSocialStatus from '../ward-social-status/ward-social-status.model';
import Ward from '../ward/ward.model';

@Table({ tableName: 's_social_status' })
export default class SocialStatus extends Model<SocialStatus> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) socialStatusName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** Many-to-many */
  @BelongsToMany(
    () => Ward,
    () => WardSocialStatus,
  )
  wards: Ward[];
  // wards: Array<Ward & { WardSocialStatus: WardSocialStatus }>;
}
