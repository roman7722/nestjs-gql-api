import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Agreement from '../agreement/agreement.model';
import City from '../city/city.model';
import Customer from '../customer/customer.model';
import District from '../district/district.model';
import FamilyStatus from '../family-status/family-status.model';
import Quarter from '../quarter/quarter.model';
import SocialStatus from '../social-status/social-status.model';
import User from '../user/user.model';
import WardSocialStatus from '../ward-social-status/ward-social-status.model';
import WardStageProgress from '../ward-stage-progress/ward-stage-progress.model';

@Table({ tableName: 'ward', timestamps: true })
export default class Ward extends Model<Ward> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  /** Many-to-one */
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
  @BelongsTo(() => User) user: User;

  /** Many-to-one */
  @ForeignKey(() => Customer)
  @Column({ allowNull: true })
  customerId: number;
  @BelongsTo(() => Customer) customer: Customer;

  @Column({ allowNull: true }) firstName: string;
  @Column({ allowNull: true }) middleName: string;
  @Column({ allowNull: true }) secondName: string;
  @Column({ allowNull: true }) displayName: string;
  @Column({ allowNull: true }) hbDate: Date;
  @Column({ allowNull: true, unique: true }) passportNumber: string;
  @Column({ allowNull: true }) passportIssuedBy: string;
  @Column({ allowNull: true }) passportIssuedDate: Date;

  /** Many-to-many */
  @BelongsToMany(() => SocialStatus, () => WardSocialStatus)
  // tslint:disable-next-line: array-type
  socialStatuses: Array<SocialStatus & { WardSocialStatus: WardSocialStatus }>;

  /** Many-to-one */
  @ForeignKey(() => FamilyStatus)
  @Column({ allowNull: true })
  familyStatusId: number;
  @BelongsTo(() => FamilyStatus) familyStatuses: FamilyStatus;

  /** Many-to-one */
  @ForeignKey(() => City)
  @Column({ allowNull: true })
  cityId: number;
  @BelongsTo(() => City) city: City;

  /** Many-to-one */
  @ForeignKey(() => District)
  @Column({ allowNull: true })
  districtId: number;
  @BelongsTo(() => District) district: District;

  /** Many-to-one */
  @ForeignKey(() => Quarter)
  @Column({ allowNull: true })
  quarterId: number;
  @BelongsTo(() => Quarter) quarter: Quarter;

  @Column({ allowNull: true }) street: string;
  @Column({ allowNull: true }) house: string;
  @Column({ allowNull: true }) apartment: string;
  @Column({ allowNull: true }) floor: string;
  @Column({ allowNull: true }) entrance: string;
  @Column({ allowNull: true }) phone: string;
  @Column({ allowNull: true }) doctorsReport: boolean;
  @Column({ allowNull: true, type: DataType.TEXT }) events: string;
  @Column({ allowNull: true }) rem: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;
  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;

  /** One-to-many */
  @HasMany(() => WardStageProgress) wardStagesProgressList: WardStageProgress[];
  @HasMany(() => Agreement) agreements: Agreement[];
}
