import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import WardStageProgress from '../ward-stage-progress/ward-stage-progress.model';

@Table({ tableName: 's_ward_stage' })
export default class WardStage extends Model<WardStage> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) wardStageName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => WardStageProgress) wardStageProgresses: WardStageProgress[];
}
