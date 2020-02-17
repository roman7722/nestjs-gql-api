import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../common/decorators';
import WardStage from '../ward-stage/ward-stage.model';
import Ward from '../ward/ward.model';
import { WardStageProgressListArgs } from './args/ward-stage-progress-list.args';
import { WardStageProgressCreateInput } from './input/ward-stage-progress-create.input';
import { WardStageProgressDeleteInput } from './input/ward-stage-progress-delete.input';
import { WardStageProgressUpdateInput } from './input/ward-stage-progress-update.input';
import WardStageProgress from './ward-stage-progress.model';

@Injectable()
export class WardStageProgressService {
  constructor(
    @Inject('WARD_STAGE_PROGRESS_REPOSITORY')
    private readonly WARD_STAGE_PROGRESS_REPOSITORY: typeof WardStageProgress,
  ) {}

  public async checkVersion(
    id: string,
  ): Promise<WardStageProgress | undefined> {
    try {
      return await this.WARD_STAGE_PROGRESS_REPOSITORY.findOne<
        WardStageProgress
      >({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async wardStageProgress(id: number): Promise<WardStageProgress> {
    try {
      return await this.WARD_STAGE_PROGRESS_REPOSITORY.findOne<
        WardStageProgress | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async wardStageProgressList(
    data: WardStageProgressListArgs,
  ): Promise<WardStageProgress[]> {
    try {
      const { wardId, textFilter, paging, page } = data;

      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.WARD_STAGE_PROGRESS_REPOSITORY.findAll<
        WardStageProgress
      >({
        limit: paging,
        offset: (page - 1) * paging,
        include: [Ward, WardStage],
        where: {
          [Op.and]: {
            wardId,
            rem: {
              [Op.iRegexp]: iRegexp,
            },
          },
        },
        order: [['wardStageDate', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async wardStageProgressCreate(
    data: WardStageProgressCreateInput,
  ): Promise<WardStageProgress> {
    try {
      return await this.WARD_STAGE_PROGRESS_REPOSITORY.create<
        WardStageProgress
      >(data);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @OptimisticLocking(true)
  async wardStageProgressUpdate(
    data: WardStageProgressUpdateInput,
  ): Promise<WardStageProgress> {
    try {
      const res = await this.WARD_STAGE_PROGRESS_REPOSITORY.update<
        WardStageProgress
      >(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @OptimisticLocking(false)
  async wardStageProgressDelete(
    data: WardStageProgressDeleteInput,
  ): Promise<Number> {
    try {
      const { id, version } = data;
      return await this.WARD_STAGE_PROGRESS_REPOSITORY.destroy({
        where: {
          [Op.and]: [{ id }, { version }],
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
