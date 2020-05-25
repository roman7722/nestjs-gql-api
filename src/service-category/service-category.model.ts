import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import ServiceGrid from '../service-grid/service-grid.model';
import ServiceGuide from '../service-guide/service-guide.model';

// import WardService from '../ward-service/ward-service.model';

@Table({ tableName: 's_service_category' })
export default class ServiceCategory extends Model<ServiceCategory> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) serviceCategoryName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => ServiceGuide) serviceGuides: ServiceGuide[];
  @HasMany(() => ServiceGrid) serviceGrids: ServiceGrid[];
  //   @HasMany(() => WardService) wardServices: WardService[];
}
