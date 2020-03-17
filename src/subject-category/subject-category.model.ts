import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Customer from '../customer/customer.model';
import Subject from '../subject/subject.model';

@Table({ tableName: 's_subject_category' })
export default class SubjectCategory extends Model<SubjectCategory> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) subjectCategoryName: string;
  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => Subject) subjects: Subject[];
  @HasMany(() => Customer) customers: Customer[];
}
