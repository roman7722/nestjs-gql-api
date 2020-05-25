import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import ServiceCategory from '../service-category/service-category.model';
import ServiceGuide from '../service-guide/service-guide.model';

@Table({ tableName: 's_service_grid', timestamps: true })
export default class ServiceGrid extends Model<ServiceGrid> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  /** Many-to-one */
  @ForeignKey(() => ServiceCategory)
  @Column({ allowNull: false })
  serviceCategoryId: number;
  @BelongsTo(() => ServiceCategory) serviceCategory: ServiceCategory;

  /** Many-to-one */
  @ForeignKey(() => ServiceGuide)
  @Column({ allowNull: false })
  serviceGuideId: number;
  @BelongsTo(() => ServiceGuide) serviceGuide: ServiceGuide;

  @Column({ allowNull: false, type: DataType.DOUBLE }) hoursFrom: number;
  @Column({ allowNull: false, type: DataType.DOUBLE }) hoursTo: number;
  @Column({ allowNull: false, type: DataType.DOUBLE }) workDayPrice: number;
  @Column({ allowNull: false, type: DataType.DOUBLE }) restDayPrice: number;
  @Column({ allowNull: true }) rem: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;
  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;
}
