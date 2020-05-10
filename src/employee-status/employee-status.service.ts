import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import EmployeeStatus from './employee-status.model';
import { EmployeeStatusCreateInput } from './input/employee-status-create.input';
import { EmployeeStatusDeleteInput } from './input/employee-status-delete.input';
import { EmployeeStatusUpdateInput } from './input/employee-status-update.input';

@Injectable()
export class EmployeeStatusService {
  constructor(
    @Inject('EMPLOYEE_STATUS_REPOSITORY')
    private readonly EMPLOYEE_STATUS_REPOSITORY: typeof EmployeeStatus,
  ) {}

  public async checkVersion(id: number): Promise<EmployeeStatus | undefined> {
    try {
      return await this.EMPLOYEE_STATUS_REPOSITORY.findOne<EmployeeStatus>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeeStatus(id: number): Promise<EmployeeStatus> {
    try {
      return await this.EMPLOYEE_STATUS_REPOSITORY.findOne<
        EmployeeStatus | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeeStatusList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<EmployeeStatus[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.EMPLOYEE_STATUS_REPOSITORY.findAll<EmployeeStatus>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          employeeStatusName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['employeeStatusName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeeStatusNameFind(employeeStatusName: string): Promise<EmployeeStatus> {
    try {
      return await this.EMPLOYEE_STATUS_REPOSITORY.findOne<
        EmployeeStatus | undefined
      >({
        where: { employeeStatusName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'employeeStatusNameFind',
    'employeeStatusName',
    'employeeStatus:validate:notUniqueEmployeeStatusName',
  )
  async employeeStatusCreate(
    data: EmployeeStatusCreateInput,
  ): Promise<EmployeeStatus> {
    try {
      return await this.EMPLOYEE_STATUS_REPOSITORY.create<EmployeeStatus>(data);
    } catch (error) {
      if (
        error.messageCode === 'employeeStatus:validate:notUniqueEmployeeStatusName'
      ) {
        throw new MessageCodeError(
          'employeeStatus:validate:notUniqueEmployeeStatusName',
        );
      }
      throw new MessageCodeError(
        'employeeStatus:create:unableToCreateEmployeeStatus',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'employeeStatusNameFind',
    'employeeStatusName',
    'employeeStatus:validate:notUniqueEmployeeStatusName',
  )
  async employeeStatusUpdate(
    data: EmployeeStatusUpdateInput,
  ): Promise<EmployeeStatus> {
    try {
      const res = await this.EMPLOYEE_STATUS_REPOSITORY.update<EmployeeStatus>(
        data,
        {
          where: { id: data.id },
          returning: true,
        },
      );
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (
        error.messageCode === 'employeeStatus:validate:notUniqueEmployeeStatusName'
      ) {
        throw new MessageCodeError(
          'employeeStatus:validate:notUniqueEmployeeStatusName',
        );
      }
      throw new MessageCodeError(
        'employeeStatus:update:unableToUpdateEmployeeStatus',
      );
    }
  }

  @OptimisticLocking(false)
  async employeeStatusDelete(data: EmployeeStatusDeleteInput): Promise<Number> {
    try {
      return await this.EMPLOYEE_STATUS_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
