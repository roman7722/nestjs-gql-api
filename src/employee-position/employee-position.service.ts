import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import EmployeePosition from './employee-position.model';
import { EmployeePositionCreateInput } from './input/employee-position-create.input';
import { EmployeePositionDeleteInput } from './input/employee-position-delete.input';
import { EmployeePositionUpdateInput } from './input/employee-position-update.input';

@Injectable()
export class EmployeePositionService {
  constructor(
    @Inject('EMPLOYEE_POSITION_REPOSITORY')
    private readonly EMPLOYEE_POSITION_REPOSITORY: typeof EmployeePosition,
  ) {}

  public async checkVersion(id: number): Promise<EmployeePosition | undefined> {
    try {
      return await this.EMPLOYEE_POSITION_REPOSITORY.findOne<EmployeePosition>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeePosition(id: number): Promise<EmployeePosition> {
    try {
      return await this.EMPLOYEE_POSITION_REPOSITORY.findOne<
        EmployeePosition | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeePositionList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<EmployeePosition[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.EMPLOYEE_POSITION_REPOSITORY.findAll<EmployeePosition>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          employeePositionName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['employeePositionName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeePositionCreate(
    data: EmployeePositionCreateInput,
  ): Promise<EmployeePosition> {
    try {
      return await this.EMPLOYEE_POSITION_REPOSITORY.create<EmployeePosition>(
        data,
      );
    } catch (error) {
      throw new MessageCodeError(
        'employeePosition:create:unableToCreateEmployeePosition',
      );
    }
  }

  @OptimisticLocking(true)
  async employeePositionUpdate(
    data: EmployeePositionUpdateInput,
  ): Promise<EmployeePosition> {
    try {
      const res = await this.EMPLOYEE_POSITION_REPOSITORY.update<
        EmployeePosition
      >(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      throw new MessageCodeError(
        'employeePosition:update:unableToUpdateEmployeePosition',
      );
    }
  }

  @OptimisticLocking(false)
  async employeePositionDelete(
    data: EmployeePositionDeleteInput,
  ): Promise<Number> {
    try {
      return await this.EMPLOYEE_POSITION_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
