import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Agreement from '../agreement/agreement.model';
import City from '../city/city.model';
import CustomerCategory from '../customer-category/customer-category.model';
import PaymentForm from '../payment-form/payment-form.model';
import SubjectCategory from '../subject-category/subject-category.model';
import Subject from '../subject/subject.model';
import User from '../user/user.model';
import Ward from '../ward/ward.model';
import WhatAboutUs from '../what-about-us/what-about-us.model';

@Table({ tableName: 'customer', timestamps: true })
export default class Customer extends Model<Customer> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  /** Many-to-one */
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
  @BelongsTo(() => User) user: User;

  @Column({ allowNull: true }) firstName: string;
  @Column({ allowNull: true }) middleName: string;
  @Column({ allowNull: true }) secondName: string;
  @Column({ allowNull: true }) displayName: string;

  /** Many-to-one */
  @ForeignKey(() => SubjectCategory)
  @Column({ allowNull: true })
  subjectCategoryId: number;
  @BelongsTo(() => SubjectCategory) subjectCategory: SubjectCategory;

  /** Many-to-one */
  @ForeignKey(() => Subject)
  @Column({ allowNull: true })
  subjectId: number;
  @BelongsTo(() => Subject) subject: Subject;

  @Column({ allowNull: true }) phone: string;
  @Column({ allowNull: true }) email: string;
  @Column({ allowNull: true }) passportNumber: string;
  @Column({ allowNull: true }) passportIssuedBy: string;

  @Column({ allowNull: true }) passportIssuedDate: Date;

  /** Many-to-one */
  @ForeignKey(() => City)
  @Column({ allowNull: true })
  cityId: number;
  @BelongsTo(() => City) city: City;

  @Column({ allowNull: true }) street: string;
  @Column({ allowNull: true }) apartment: string;
  @Column({ allowNull: true }) house: string;

  /** Many-to-one */
  @ForeignKey(() => CustomerCategory)
  @Column({ allowNull: true })
  customerCategoryId: number;
  @BelongsTo(() => CustomerCategory) customerCategory: CustomerCategory;

  /** Many-to-one */
  @ForeignKey(() => PaymentForm)
  @Column({ allowNull: true })
  paymentFormId: number;
  @BelongsTo(() => PaymentForm) paymentForm: PaymentForm;

  @Column({ allowNull: true }) companyName: string;

  /** Many-to-one */
  @ForeignKey(() => WhatAboutUs)
  @Column({ allowNull: true })
  whatAboutUsId: number;
  @BelongsTo(() => WhatAboutUs) whatAboutUs: WhatAboutUs;

  @Column({ allowNull: true }) rem: string;

  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  @Column({ allowNull: false }) createdAt: Date;
  @Column({ allowNull: false }) updatedAt: Date;

  /** One-to-many */
  @HasMany(() => Agreement) agreements: Agreement[];
  @HasMany(() => Ward) wards: Ward[];
}
