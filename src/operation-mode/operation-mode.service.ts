import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { OperationModeCreateInputDto } from './dto/input/operation-mode-create.input.dto';
import { OperationModeDeleteInputDto } from './dto/input/operation-mode-delete.input.dto';
import { OperationModeUpdateInputDto } from './dto/input/operation-mode-update.input.dto';
import OperationMode from './operation-mode.model';

@Injectable()
export class OperationModeService {
  constructor(
    @Inject('OPERATION_MODE_REPOSITORY')
    private readonly OPERATION_MODE_REPOSITORY: typeof OperationMode,
  ) {}

  public async checkVersion(id: number): Promise<OperationMode | undefined> {
    try {
      return await this.OPERATION_MODE_REPOSITORY.findOne<OperationMode>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async operationMode(id: number): Promise<OperationMode> {
    try {
      return await this.OPERATION_MODE_REPOSITORY.findOne<
        OperationMode | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async operationModeList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<OperationMode[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.OPERATION_MODE_REPOSITORY.findAll<OperationMode>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          operationModeName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['operationModeName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async operationModeNameFind(
    operationModeName: string,
  ): Promise<OperationMode> {
    try {
      return await this.OPERATION_MODE_REPOSITORY.findOne<
        OperationMode | undefined
      >({
        where: { operationModeName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'operationModeNameFind',
    'operationModeName',
    'operationMode:validate:notUniqueOperationModeName',
  )
  async operationModeCreate(
    data: OperationModeCreateInputDto,
  ): Promise<OperationMode> {
    try {
      return await this.OPERATION_MODE_REPOSITORY.create<OperationMode>(data);
    } catch (error) {
      if (
        error.messageCode ===
        'operationMode:validate:notUniqueOperationModeName'
      ) {
        throw new MessageCodeError(
          'operationMode:validate:notUniqueOperationModeName',
        );
      }
      throw new MessageCodeError(
        'operationMode:create:unableToCreateOperationMode',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'operationModeNameFind',
    'operationModeName',
    'operationMode:validate:notUniqueOperationModeName',
  )
  async operationModeUpdate(
    data: OperationModeUpdateInputDto,
  ): Promise<OperationMode> {
    try {
      const res = await this.OPERATION_MODE_REPOSITORY.update<OperationMode>(
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
        error.messageCode ===
        'operationMode:validate:notUniqueOperationModeName'
      ) {
        throw new MessageCodeError(
          'operationMode:validate:notUniqueOperationModeName',
        );
      }
      throw new MessageCodeError(
        'operationMode:update:unableToUpdateOperationMode',
      );
    }
  }

  @OptimisticLocking(false)
  async operationModeDelete(
    data: OperationModeDeleteInputDto,
  ): Promise<Number> {
    try {
      return await this.OPERATION_MODE_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
