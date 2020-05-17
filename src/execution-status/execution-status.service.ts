import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { ExecutionStatusCreateInputDto } from './dto/input/execution-status-create.input.dto';
import { ExecutionStatusDeleteInputDto } from './dto/input/execution-status-delete.input.dto';
import { ExecutionStatusUpdateInputDto } from './dto/input/execution-status-update.input.dto';
import ExecutionStatus from './execution-status.model';

@Injectable()
export class ExecutionStatusService {
  constructor(
    @Inject('EXECUTION_STATUS_REPOSITORY')
    private readonly EXECUTION_STATUS_REPOSITORY: typeof ExecutionStatus,
  ) {}

  public async checkVersion(id: number): Promise<ExecutionStatus | undefined> {
    try {
      return await this.EXECUTION_STATUS_REPOSITORY.findOne<ExecutionStatus>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async executionStatus(id: number): Promise<ExecutionStatus> {
    try {
      return await this.EXECUTION_STATUS_REPOSITORY.findOne<
        ExecutionStatus | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async executionStatusList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<ExecutionStatus[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.EXECUTION_STATUS_REPOSITORY.findAll<ExecutionStatus>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          executionStatusName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['executionStatusName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async executionStatusNameFind(
    executionStatusName: string,
  ): Promise<ExecutionStatus> {
    try {
      return await this.EXECUTION_STATUS_REPOSITORY.findOne<
        ExecutionStatus | undefined
      >({
        where: { executionStatusName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'executionStatusNameFind',
    'executionStatusName',
    'executionStatus:validate:notUniqueExecutionStatusName',
  )
  async executionStatusCreate(
    data: ExecutionStatusCreateInputDto,
  ): Promise<ExecutionStatus> {
    try {
      return await this.EXECUTION_STATUS_REPOSITORY.create<ExecutionStatus>(
        data,
      );
    } catch (error) {
      if (
        error.messageCode ===
        'executionStatus:validate:notUniqueExecutionStatusName'
      ) {
        throw new MessageCodeError(
          'executionStatus:validate:notUniqueExecutionStatusName',
        );
      }
      throw new MessageCodeError(
        'executionStatus:create:unableToCreateExecutionStatus',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'executionStatusNameFind',
    'executionStatusName',
    'executionStatus:validate:notUniqueExecutionStatusName',
  )
  async executionStatusUpdate(
    data: ExecutionStatusUpdateInputDto,
  ): Promise<ExecutionStatus> {
    try {
      const res = await this.EXECUTION_STATUS_REPOSITORY.update<
        ExecutionStatus
      >(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (
        error.messageCode ===
        'executionStatus:validate:notUniqueExecutionStatusName'
      ) {
        throw new MessageCodeError(
          'executionStatus:validate:notUniqueExecutionStatusName',
        );
      }
      throw new MessageCodeError(
        'executionStatus:update:unableToUpdateExecutionStatus',
      );
    }
  }

  @OptimisticLocking(false)
  async executionStatusDelete(
    data: ExecutionStatusDeleteInputDto,
  ): Promise<Number> {
    try {
      return await this.EXECUTION_STATUS_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
