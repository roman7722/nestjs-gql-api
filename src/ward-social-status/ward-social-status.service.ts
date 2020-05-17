import { difference } from 'lodash';
import { Op, Transaction } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { WardSocialStatusCreateInputDto } from './dto/input/ward-social-status-create.input.dto';
import { WardSocialStatusDeleteInputDto } from './dto/input/ward-social-status-delete.input.dto';
import { WardSocialStatusUpdateInputDto } from './dto/input/ward-social-status-update.input.dto';
import WardSocialStatus from './ward-social-status.model';

@Injectable()
export class WardSocialStatusService {
  constructor(
    @Inject('WARD_SOCIAL_STATUS_REPOSITORY')
    private readonly WARD_SOCIAL_STATUS_REPOSITORY: typeof WardSocialStatus,
  ) {}

  async wardSocialStatusesList(
    wardId: number,
  ): Promise<WardSocialStatus[] | undefined> {
    try {
      return await this.WARD_SOCIAL_STATUS_REPOSITORY.findAll<WardSocialStatus>(
        {
          where: { wardId },
          attributes: ['socialStatusId'],
        },
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async wardSocialStatusesCreate(
    data: WardSocialStatusCreateInputDto,
    transaction?: Transaction,
  ): Promise<WardSocialStatus[]> {
    try {
      const { wardId, socialStatusesIds } = data;

      const promises = socialStatusesIds.map(async (id: number) => {
        const row = { wardId, socialStatusId: id };

        return await this.WARD_SOCIAL_STATUS_REPOSITORY.create<any>(row, {
          transaction,
        });
      });

      const result = await Promise.all(promises);

      return result;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async wardSocialStatusesUpdate(
    data: WardSocialStatusUpdateInputDto,
    transaction?: Transaction,
  ): Promise<any[]> {
    const { wardId, oldSocialStatusesIds, newSocialStatusesIds } = data;

    /** Массив id социальных статусов, которые нужно удалить */
    const statusesToDelete: number[] = difference(
      oldSocialStatusesIds,
      newSocialStatusesIds,
    );

    /** Массив id социальных статусов, которые нужно добавить */
    const statusesToCreate: number[] = difference(
      newSocialStatusesIds,
      oldSocialStatusesIds,
    );

    const promiseDeleted = await this.wardSocialStatusesDelete(
      { wardId, socialStatusesIds: statusesToDelete },
      transaction,
    );

    const promiseCreated = await this.wardSocialStatusesCreate(
      { wardId, socialStatusesIds: statusesToCreate },
      transaction,
    );

    const result = await Promise.all([promiseDeleted, promiseCreated]);

    return result;
  }

  async wardSocialStatusesDelete(
    data: WardSocialStatusDeleteInputDto,
    transaction?: Transaction,
  ): Promise<Number[]> {
    try {
      const { wardId, socialStatusesIds } = data;

      const promises = socialStatusesIds.map(async (socialStatusId: number) => {
        return await this.WARD_SOCIAL_STATUS_REPOSITORY.destroy({
          where: {
            [Op.and]: [{ wardId }, { socialStatusId }],
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

  async deleteAllWardSocialStatusesByWardId(
    id: number,
    transaction?: Transaction,
  ): Promise<number> {
    return await this.WARD_SOCIAL_STATUS_REPOSITORY.destroy({
      where: {
        wardId: id,
      },
      transaction,
    });
  }
}
