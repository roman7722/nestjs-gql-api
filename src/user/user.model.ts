import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Agreement from '../agreement/agreement.model';
import Customer from '../customer/customer.model';
import EmployeeBonus from '../employee-bonus/employee-bonus.model';
import EmployeePosition from '../employee-position/employee-position.model';
import Session from '../session/session.model';
import UserRole from '../user-role/user-role.model';
import Ward from '../ward/ward.model';

@Table({ tableName: 'user', timestamps: true })
export default class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;
  @Column({ allowNull: true }) firstName: string;
  @Column({ allowNull: true }) middleName: string;
  @Column({ allowNull: true }) secondName: string;
  @Column({ allowNull: true }) displayName: string;
  @Column({ allowNull: false, unique: true }) username: string;
  @Column({ allowNull: false }) passwordHash: string;
  @Column({ allowNull: true }) email: string;
  @Column({ allowNull: true }) phone: string;
  @Column({ allowNull: true }) rem: string;

  /** Many-to-one */
  @ForeignKey(() => UserRole)
  @Column({ allowNull: false })
  roleId: string;
  @BelongsTo(() => UserRole) role: UserRole;

  @Column({ allowNull: false, defaultValue: 1 }) version: number;

  /** One-to-many */
  @HasMany(() => Agreement) agreements: Agreement[];
  @HasMany(() => Session) sessions: Session[];
  @HasMany(() => Ward) wards: Ward[];
  @HasMany(() => Customer) customers: Customer[];
  @HasMany(() => EmployeeBonus) employeeBonuses: EmployeeBonus[];
  @HasMany(() => EmployeePosition) EmployeePositions: EmployeePosition[];
}
