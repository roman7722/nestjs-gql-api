import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import WardStage from '../ward-stage/ward-stage.model';
import Ward from '../ward/ward.model';

@Table({ tableName: 'ward_stage_progress', timestamps: true })
export default class WardStageProgress extends Model<WardStageProgress> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false }) wardStageDate: Date;

  /** Many-to-one */
  @ForeignKey(() => WardStage)
  @Column({ allowNull: false })
  wardStageId: number;
  @BelongsTo(() => WardStage) wardStage: WardStage;

  /** Many-to-one */
  @ForeignKey(() => Ward)
  @Column({ allowNull: false })
  wardId: number;
  @BelongsTo(() => Ward) ward: Ward;

  @Column({ allowNull: true }) rem: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;
  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;
}
