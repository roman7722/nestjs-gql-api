import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import EmployeeBonus from './employee-bonus.model';
import { EmployeeBonusCreateInput } from './input/employee-bonus-create.input';
import { EmployeeBonusDeleteInput } from './input/employee-bonus-delete.input';
import { EmployeeBonusUpdateInput } from './input/employee-bonus-update.input';

@Injectable()
export class EmployeeBonusService {
  constructor(
    @Inject('EMPLOYEE_BONUS_REPOSITORY')
    private readonly EMPLOYEE_BONUS_REPOSITORY: typeof EmployeeBonus,
  ) { }

  public async checkVersion(id: number): Promise<EmployeeBonus | undefined> {
    try {
      return await this.EMPLOYEE_BONUS_REPOSITORY.findOne<EmployeeBonus>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeeBonus(id: number): Promise<EmployeeBonus> {
    try {
      return await this.EMPLOYEE_BONUS_REPOSITORY.findOne<
        EmployeeBonus | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeeBonusList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<EmployeeBonus[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.EMPLOYEE_BONUS_REPOSITORY.findAll<EmployeeBonus>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          rem: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['rem', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeeBonusCreate(
    data: EmployeeBonusCreateInput,
  ): Promise<EmployeeBonus> {
    try {
      return await this.EMPLOYEE_BONUS_REPOSITORY.create<EmployeeBonus>(
        data,
      );
    } catch (error) {
      throw new MessageCodeError(
        'employeeBonus:create:unableToCreateEmployeeBonus',
      );
    }
  }

  @OptimisticLocking(true)
  async employeeBonusUpdate(
    data: EmployeeBonusUpdateInput,
  ): Promise<EmployeeBonus> {
    try {
      const res = await this.EMPLOYEE_BONUS_REPOSITORY.update<
        EmployeeBonus
      >(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      throw new MessageCodeError(
        'employeeBonus:update:unableToUpdateEmployeeBonus',
      );
    }
  }

  @OptimisticLocking(false)
  async employeeBonusDelete(
    data: EmployeeBonusDeleteInput,
  ): Promise<Number> {
    try {
      return await this.EMPLOYEE_BONUS_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
