import { Op, Transaction } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import City from '../city/city.model';
import { MessageCodeError } from '../common/error';
import District from '../district/district.model';
import FamilyStatus from '../family-status/family-status.model';
import Quarter from '../quarter/quarter.model';
import SocialStatus from '../social-status/social-status.model';
import User from '../user/user.model';
import { WardSocialStatusService } from '../ward-social-status/ward-social-status.service';
import { WardCreateInput } from './input/ward-create.input';
import { WardDeleteInput } from './input/ward-delete.input';
import { WardUpdateInput } from './input/ward-update.input';
import Ward from './ward.model';

@Injectable()
export class WardService {
  constructor(
    @Inject('SEQUELIZE') private readonly SEQUELIZE,
    @Inject('WARD_REPOSITORY') private readonly WARD_REPOSITORY: typeof Ward,
    private readonly wardSocialStatusService: WardSocialStatusService,
  ) {}

  async ward(id: number): Promise<Ward | undefined> {
    try {
      return await this.WARD_REPOSITORY.findOne<Ward>({
        include: [User, City, District, Quarter, FamilyStatus, SocialStatus],
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async wardCreate(data: WardCreateInput): Promise<any> {
    const { socialStatusesList, ...rest } = data;
    let transaction: Transaction;

    try {
      transaction = await this.SEQUELIZE.transaction();

      const result = await this.WARD_REPOSITORY.create<Ward>(rest, {
        transaction,
      });

      const newId: number = result.getDataValue('id');

      if (socialStatusesList) {
        await this.wardSocialStatusService.wardSocialStatusesCreate(
          {
            wardId: newId,
            socialStatusesIds: socialStatusesList,
          },
          transaction,
        );
      }

      transaction.commit();

      return result;
    } catch (error) {
      transaction.rollback();

      throw new MessageCodeError('ward:create:unableToCreateWard');
    }
  }

  async wardUpdate(data: WardUpdateInput): Promise<any> {
    const { socialStatusesList, ...rest } = data;
    const { id } = rest;

    let transaction: Transaction;

    try {
      const wardSocialStatuses = await this.wardSocialStatusService.wardSocialStatusesList(
        id,
      );

      const oldSocialStatusesIds = wardSocialStatuses.map(status =>
        status.getDataValue('socialStatusId'),
      );

      transaction = await this.SEQUELIZE.transaction();

      await this.wardSocialStatusService.wardSocialStatusesUpdate(
        {
          wardId: id,
          oldSocialStatusesIds,
          newSocialStatusesIds: socialStatusesList,
        },
        transaction,
      );

      const res = await this.WARD_REPOSITORY.update<Ward>(rest, {
        where: { id },
        returning: true,
        transaction,
      });

      transaction.commit();

      const [, [val]] = res;

      return val;
    } catch (error) {
      transaction.rollback();

      throw new MessageCodeError('ward:update:unableToUpdateWard');
    }
  }

  async wardDelete(data: WardDeleteInput): Promise<Number> {
    const { id, version } = data;
    let transaction: Transaction;

    try {
      transaction = await this.SEQUELIZE.transaction();
      await this.wardSocialStatusService.deleteAllWardSocialStatusesByWardId(
        id,
        transaction,
      );
      const result = await this.WARD_REPOSITORY.destroy({
        where: {
          [Op.and]: [{ id }, { version }],
        },
        transaction,
      });

      transaction.commit();

      return result;
    } catch (error) {
      transaction.rollback();
      throw new BadRequestException();
    }
  }
}
