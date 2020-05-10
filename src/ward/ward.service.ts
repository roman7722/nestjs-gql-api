import { isEmpty } from 'lodash';
import { Op, Transaction } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import City from '../city/city.model';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
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

  async wardList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<Ward[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.WARD_REPOSITORY.findAll<Ward>({
        limit: paging,
        offset: (page - 1) * paging,
        include: [User, City, District, Quarter, FamilyStatus, SocialStatus],
        where: {
          employeeName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['wardName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async passportNumberFind(passportNumber: string): Promise<Ward> {
    try {
      return await this.WARD_REPOSITORY.findOne<Ward | undefined>({
        where: { passportNumber },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'passportNumberFind',
    'passportNumber',
    'ward:validate:notUniquePassportNumber',
  )
  async wardCreate(data: WardCreateInput): Promise<any> {
    const { socialStatusesIds, ...rest } = data;
    let transaction: Transaction;

    try {
      transaction = await this.SEQUELIZE.transaction();

      const result = await this.WARD_REPOSITORY.create<Ward>(rest, {
        transaction,
      });

      const newId: number = result.getDataValue('id');

      if (socialStatusesIds) {
        await this.wardSocialStatusService.wardSocialStatusesCreate(
          {
            wardId: newId,
            socialStatusesIds,
          },
          transaction,
        );
      }

      transaction.commit();

      return result;
    } catch (error) {
      transaction.rollback();

      switch (error.messageCode) {
        case 'ward:validate:notUniquePassportNumber':
          throw new MessageCodeError('ward:validate:notUniquePassportNumber');
        default:
          throw new MessageCodeError('ward:create:unableToCreateWard');
      }
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'passportNumberFind',
    'passportNumber',
    'ward:validate:notUniquePassportNumber',
  )
  async wardUpdate(data: WardUpdateInput): Promise<any> {
    const { socialStatusesIds, ...rest } = data;
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
          newSocialStatusesIds: socialStatusesIds,
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

      switch (error.messageCode) {
        case 'ward:validate:notUniquePassportNumber':
          throw new MessageCodeError('ward:validate:notUniquePassportNumber');
        default:
          throw new MessageCodeError('ward:update:unableToUpdateWard');
      }
    }
  }

  @OptimisticLocking(false)
  async wardDelete(data: WardDeleteInput): Promise<Number> {
    const { id } = data;
    let transaction: Transaction;

    try {
      transaction = await this.SEQUELIZE.transaction();

      await this.wardSocialStatusService.deleteAllWardSocialStatusesByWardId(
        id,
        transaction,
      );

      const result = await this.WARD_REPOSITORY.destroy({
        where: { id },
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
