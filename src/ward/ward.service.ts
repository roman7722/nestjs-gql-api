import { isEmpty } from 'lodash';
import { Op, Transaction } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import City from '../city/city.model';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error';
import District from '../district/district.model';
import FamilyStatus from '../family-status/family-status.model';
import Quarter from '../quarter/quarter.model';
import SocialStatus from '../social-status/social-status.model';
import User from '../user/user.model';
import { WardSocialStatusService } from '../ward-social-status/ward-social-status.service';
import { WardCreateInputDto } from './dto/input/ward-create.input.dto';
import { WardDeleteInputDto } from './dto/input/ward-delete.input.dto';
import { WardUpdateInputDto } from './dto/input/ward-update.input.dto';
import Ward from './ward.model';

@Injectable()
export class WardService {
  constructor(
    @Inject('SEQUELIZE') private readonly SEQUELIZE,
    @Inject('WARD_REPOSITORY') private readonly WARD_REPOSITORY: typeof Ward,
    private readonly wardSocialStatusService: WardSocialStatusService,
  ) {}

  private readonly includedModels = [
    User,
    City,
    District,
    Quarter,
    FamilyStatus,
    SocialStatus,
  ];

  public async checkVersion(id: number): Promise<Ward | undefined> {
    try {
      return await this.WARD_REPOSITORY.findOne<Ward>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async ward(id: number): Promise<Ward | undefined> {
    try {
      return await this.WARD_REPOSITORY.findOne<Ward>({
        include: this.includedModels,
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
        include: this.includedModels,
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

  async passportNumberFind(passportNumber: string): Promise<Ward> {
    try {
      return await this.WARD_REPOSITORY.findOne<Ward | undefined>({
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
  //   'ward:validate:notUniquePassportNumber',
  // )
  async wardCreate(data: WardCreateInputDto): Promise<any> {
    const { socialStatusesIds, ...rest } = data;
    let transaction: Transaction;

    try {
      transaction = await this.SEQUELIZE.transaction();

      const result = await this.WARD_REPOSITORY.create<Ward>(
        {
          ...rest,
          displayName: `${rest.secondName} ${rest.firstName} ${rest.middleName}`,
        },
        {
          transaction,
        },
      );

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
      console.log(error);

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
  // @CheckIsValueUnique(
  //   'passportNumberFind',
  //   'passportNumber',
  //   'ward:validate:notUniquePassportNumber',
  // )
  async wardUpdate(data: WardUpdateInputDto): Promise<any> {
    const { socialStatusesIds, ...rest } = data;
    const { id } = rest;

    let transaction: Transaction;

    try {
      const wardSocialStatuses = await this.wardSocialStatusService.wardSocialStatusesList(
        id,
      );

      const oldSocialStatusesIds = wardSocialStatuses.map((status) =>
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

      const res = await this.WARD_REPOSITORY.update<Ward>(
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
        case 'ward:validate:notUniquePassportNumber':
          throw new MessageCodeError('ward:validate:notUniquePassportNumber');
        default:
          throw new MessageCodeError('ward:update:unableToUpdateWard');
      }
    }
  }

  @OptimisticLocking(false)
  async wardDelete(data: WardDeleteInputDto): Promise<Number> {
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
