import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import SocialStatus from '../social-status/social-status.model';
import Ward from '../ward/ward.model';

@Table({ tableName: 'ward_social_status', version: false })
export default class WardSocialStatus extends Model<WardSocialStatus> {
  @ForeignKey(() => Ward)
  @Column
  wardId: number;

  @ForeignKey(() => SocialStatus)
  @Column
  socialStatusId: number;
}
