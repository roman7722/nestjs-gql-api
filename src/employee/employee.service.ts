import { isEmpty } from 'lodash';
import { Op, Transaction } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import City from '../city/city.model';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import District from '../district/district.model';
import EmployeeStatus from '../employee-status/employee-status.model';
import { EmployeeTypeJobService } from '../employee-type-job/employee-type-job.service';
import OperationMode from '../operation-mode/operation-mode.model';
import Quarter from '../quarter/quarter.model';
import TypeJob from '../type-job/type-job.model';
import User from '../user/user.model';
import { EmployeeCreateInputDto } from './dto/input/employee-create.input.dto';
import { EmployeeDeleteInputDto } from './dto/input/employee-delete.input.dto';
import { EmployeeUpdateInputDto } from './dto/input/employee-update.input.dto';
import Employee from './employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('SEQUELIZE') private readonly SEQUELIZE,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly EMPLOYEE_REPOSITORY: typeof Employee,
    private readonly employeeTypeJobService: EmployeeTypeJobService,
  ) {}

  public async checkVersion(id: number): Promise<Employee | undefined> {
    try {
      return await this.EMPLOYEE_REPOSITORY.findOne<Employee>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employee(id: number): Promise<Employee> {
    try {
      return await this.EMPLOYEE_REPOSITORY.findOne<Employee | undefined>({
        include: [
          User,
          City,
          District,
          Quarter,
          EmployeeStatus,
          OperationMode,
          TypeJob,
        ],
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeeList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<Employee[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.EMPLOYEE_REPOSITORY.findAll<Employee>({
        limit: paging,
        offset: (page - 1) * paging,
        include: [
          User,
          City,
          District,
          Quarter,
          EmployeeStatus,
          OperationMode,
          TypeJob,
        ],
        where: {
          displayName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['displayName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async passportNumberFind(passportNumber: string): Promise<Employee> {
    try {
      return await this.EMPLOYEE_REPOSITORY.findOne<Employee | undefined>({
        where: { passportNumber },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  // TODO: Исправить декоратор, не работает если не передаётся номер паспорта
  // @CheckIsValueUnique(
  //   'passportNumberFind',
  //   'passportNumber',
  //   'employee:validate:notUniquePassportNumber',
  // )
  async employeeCreate(data: EmployeeCreateInputDto): Promise<any> {
    const { typeJobsIds, ...rest } = data;
    let transaction: Transaction;

    try {
      transaction = await this.SEQUELIZE.transaction();

      const result = await this.EMPLOYEE_REPOSITORY.create<Employee>(
        {
          ...rest,
          displayName: `${rest.secondName} ${rest.firstName} ${rest.middleName}`,
        },
        {
          transaction,
        },
      );

      const newId: number = result.getDataValue('id');

      if (typeJobsIds) {
        await this.employeeTypeJobService.employeeTypeJobsCreate(
          {
            employeeId: newId,
            typeJobsIds,
          },
          transaction,
        );
      }

      transaction.commit();

      return result;
    } catch (error) {
      transaction.rollback();

      switch (error.messageCode) {
        case 'employee:validate:notUniquePassportNumber':
          throw new MessageCodeError(
            'employee:validate:notUniquePassportNumber',
          );
        default:
          throw new MessageCodeError('employee:create:unableToCreateEmployee');
      }
    }
  }

  @OptimisticLocking(true)
  // @CheckIsValueUnique(
  //   'passportNumberFind',
  //   'passportNumber',
  //   'employee:validate:notUniquePassportNumber',
  // )
  async employeeUpdate(data: EmployeeUpdateInputDto): Promise<Employee> {
    const { typeJobsIds, ...rest } = data;
    const { id } = rest;

    let transaction: Transaction;

    try {
      const typeJobs = await this.employeeTypeJobService.employeeTypeJobsList(
        id,
      );

      const oldTypeJobsIds = typeJobs.map((job) =>
        job.getDataValue('typeJobId'),
      );

      transaction = await this.SEQUELIZE.transaction();

      await this.employeeTypeJobService.employeeTypeJobsUpdate(
        {
          employeeId: id,
          oldTypeJobsIds,
          newTypeJobsIds: typeJobsIds,
        },
        transaction,
      );

      const res = await this.EMPLOYEE_REPOSITORY.update<Employee>(
        {
          ...rest,
          displayName: `${rest.secondName} ${rest.firstName} ${rest.middleName}`,
        },
        {
          where: { id },
          returning: true,
          transaction,
        },
      );

      transaction.commit();

      const [, [val]] = res;

      return val;
    } catch (error) {
      transaction.rollback();

      switch (error.messageCode) {
        case 'employee:validate:notUniquePassportNumber':
          throw new MessageCodeError(
            'employee:validate:notUniquePassportNumber',
          );
        default:
          throw new MessageCodeError('employee:update:unableToUpdateEmployee');
      }
    }
  }

  @OptimisticLocking(false)
  async employeeDelete(data: EmployeeDeleteInputDto): Promise<Number> {
    const { id } = data;
    let transaction: Transaction;

    try {
      transaction = await this.SEQUELIZE.transaction();

      await this.employeeTypeJobService.deleteAllEmployeeTypeJobsByEmployeeId(
        id,
        transaction,
      );

      const result = await this.EMPLOYEE_REPOSITORY.destroy({
        where: { id: data.id },
      });

      transaction.commit();

      return result;
    } catch (error) {
      transaction.rollback();

      throw new BadRequestException();
    }
  }
}
