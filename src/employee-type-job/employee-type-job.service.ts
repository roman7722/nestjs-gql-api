import { difference } from 'lodash';
import { Op, Transaction } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EmployeeTypeJobCreateInputDto } from './dto/input/employee-type-job-create.input';
import { EmployeeTypeJobDeleteInputDto } from './dto/input/employee-type-job-delete.input';
import { EmployeeTypeJobUpdateInputDto } from './dto/input/employee-type-job-update.input';
import EmployeeTypeJob from './employee-type-job.model';

@Injectable()
export class EmployeeTypeJobService {
  constructor(
    @Inject('EMPLOYEE_TYPE_JOB_REPOSITORY')
    private readonly EMPLOYEE_TYPE_JOB_REPOSITORY: typeof EmployeeTypeJob,
  ) {}

  async employeeTypeJobsList(
    employeeId: number,
  ): Promise<EmployeeTypeJob[] | undefined> {
    try {
      return await this.EMPLOYEE_TYPE_JOB_REPOSITORY.findAll<EmployeeTypeJob>({
        where: { employeeId },
        attributes: ['typeJobId'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeeTypeJobsCreate(
    data: EmployeeTypeJobCreateInputDto,
    transaction?: Transaction,
  ): Promise<EmployeeTypeJob[]> {
    try {
      const { employeeId, typeJobsIds } = data;

      const promises = typeJobsIds.map(async (id: number) => {
        const row = { employeeId, typeJobId: id };

        return await this.EMPLOYEE_TYPE_JOB_REPOSITORY.create<any>(row, {
          transaction,
        });
      });

      const result = await Promise.all(promises);

      return result;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async employeeTypeJobsUpdate(
    data: EmployeeTypeJobUpdateInputDto,
    transaction?: Transaction,
  ): Promise<any[]> {
    const { employeeId, oldTypeJobsIds, newTypeJobsIds } = data;

    /** Массив id видов работ, которые нужно удалить */
    const typeJobsToDelete: number[] = difference(
      oldTypeJobsIds,
      newTypeJobsIds,
    );

    /** Массив id видов работ, которые нужно добавить */
    const typeJobsToCreate: number[] = difference(
      newTypeJobsIds,
      oldTypeJobsIds,
    );

    const promiseDeleted = await this.employeeTypeJobsDelete(
      { employeeId, typeJobsIds: typeJobsToDelete },
      transaction,
    );

    const promiseCreated = await this.employeeTypeJobsCreate(
      { employeeId, typeJobsIds: typeJobsToCreate },
      transaction,
    );

    const result = await Promise.all([promiseDeleted, promiseCreated]);

    return result;
  }

  async employeeTypeJobsDelete(
    data: EmployeeTypeJobDeleteInputDto,
    transaction?: Transaction,
  ): Promise<Number[]> {
    try {
      const { employeeId, typeJobsIds } = data;

      const promises = typeJobsIds.map(async (typeJobId: number) => {
        return await this.EMPLOYEE_TYPE_JOB_REPOSITORY.destroy({
          where: {
            [Op.and]: [{ employeeId }, { typeJobId }],
          },
          transaction,
        });
      });
      const result = await Promise.all(promises);

      return result;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteAllEmployeeTypeJobsByEmployeeId(
    id: number,
    transaction?: Transaction,
  ): Promise<number> {
    return await this.EMPLOYEE_TYPE_JOB_REPOSITORY.destroy({
      where: {
        employeeId: id,
      },
      transaction,
    });
  }
}
