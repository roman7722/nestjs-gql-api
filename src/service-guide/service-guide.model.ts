import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import ServiceCategory from '../service-category/service-category.model';
import ServiceGrid from '../service-grid/service-grid.model';

// import WardService from '../ward-service/ward-service.model';

@Table({ tableName: 's_service_guide' })
export default class ServiceGuide extends Model<ServiceGuide> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) serviceGuideName: string;

  /** Many-to-one */
  @ForeignKey(() => ServiceCategory)
  @Column({ allowNull: false })
  serviceCategoryId: number;
  @BelongsTo(() => ServiceCategory) serviceCategory: ServiceCategory;

  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })
  showInCalc: boolean;
  @Column({ allowNull: true }) rem: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => ServiceGrid) serviceGrids: ServiceGrid[];
  // @HasMany(() => WardService) wardServices: WardService[];
}
