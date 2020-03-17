import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Customer from '../customer/customer.model';
import SubjectCategory from '../subject-category/subject-category.model';

@Table({ tableName: 's_subject' })
export default class Subject extends Model<Subject> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: false, unique: true }) subjectName: string;

  /** Many-to-one */
  @ForeignKey(() => SubjectCategory)
  @Column({ allowNull: false })
  subjectCategoryId: number;
  @BelongsTo(() => SubjectCategory) subjectCategory: SubjectCategory;

  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => Customer) customers: Customer[];
}
