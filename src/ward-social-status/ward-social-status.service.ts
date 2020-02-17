import { difference } from 'lodash';
import { Op, Transaction } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { WardSocialStatusCreateInput } from './input/ward-social-status-create.input';
import { WardSocialStatusDeleteInput } from './input/ward-social-status-delete.input';
import { WardSocialStatusUpdateInput } from './input/ward-social-status-update.input';
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
    data: WardSocialStatusCreateInput,
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
    data: WardSocialStatusUpdateInput,
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
    data: WardSocialStatusDeleteInput,
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
