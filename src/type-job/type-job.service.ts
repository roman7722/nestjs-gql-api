import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { TypeJobCreateInput } from './input/type-job-create.input';
import { TypeJobDeleteInput } from './input/type-job-delete.input';
import { TypeJobUpdateInput } from './input/type-job-update.input';
import TypeJob from './type-job.model';

@Injectable()
export class TypeJobService {
  constructor(
    @Inject('TYPE_JOB_REPOSITORY')
    private readonly TYPE_JOB_REPOSITORY: typeof TypeJob,
  ) {}

  public async checkVersion(id: number): Promise<TypeJob | undefined> {
    try {
      return await this.TYPE_JOB_REPOSITORY.findOne<TypeJob>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async typeJob(id: number): Promise<TypeJob> {
    try {
      return await this.TYPE_JOB_REPOSITORY.findOne<
        TypeJob | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async typeJobList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<TypeJob[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.TYPE_JOB_REPOSITORY.findAll<TypeJob>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          typeJobName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['typeJobName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async typeJobNameFind(typeJobName: string): Promise<TypeJob> {
    try {
      return await this.TYPE_JOB_REPOSITORY.findOne<
        TypeJob | undefined
      >({
        where: { typeJobName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'typeJobNameFind',
    'typeJobName',
    'typeJob:validate:notUniqueTypeJobName',
  )
  async typeJobCreate(
    data: TypeJobCreateInput,
  ): Promise<TypeJob> {
    try {
      return await this.TYPE_JOB_REPOSITORY.create<TypeJob>(data);
    } catch (error) {
      if (
        error.messageCode === 'typeJob:validate:notUniqueTypeJobName'
      ) {
        throw new MessageCodeError(
          'typeJob:validate:notUniqueTypeJobName',
        );
      }
      throw new MessageCodeError(
        'typeJob:create:unableToCreateTypeJob',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'typeJobNameFind',
    'typeJobName',
    'typeJob:validate:notUniqueTypeJobName',
  )
  async typeJobUpdate(
    data: TypeJobUpdateInput,
  ): Promise<TypeJob> {
    try {
      const res = await this.TYPE_JOB_REPOSITORY.update<TypeJob>(
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
        error.messageCode === 'typeJob:validate:notUniqueTypeJobName'
      ) {
        throw new MessageCodeError(
          'typeJob:validate:notUniqueTypeJobName',
        );
      }
      throw new MessageCodeError(
        'typeJob:update:unableToUpdateTypeJob',
      );
    }
  }

  @OptimisticLocking(false)
  async typeJobDelete(data: TypeJobDeleteInput): Promise<Number> {
    try {
      return await this.TYPE_JOB_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
