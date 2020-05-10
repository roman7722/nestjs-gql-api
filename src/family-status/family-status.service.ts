import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import FamilyStatus from './family-status.model';
import { FamilyStatusCreateInput } from './input/family-status-create.input';
import { FamilyStatusDeleteInput } from './input/family-status-delete.input';
import { FamilyStatusUpdateInput } from './input/family-status-update.input';

@Injectable()
export class FamilyStatusService {
  constructor(
    @Inject('FAMILY_STATUS_REPOSITORY')
    private readonly FAMILY_STATUS_REPOSITORY: typeof FamilyStatus,
  ) {}

  public async checkVersion(id: number): Promise<FamilyStatus | undefined> {
    try {
      return await this.FAMILY_STATUS_REPOSITORY.findOne<FamilyStatus>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async familyStatus(id: number): Promise<FamilyStatus> {
    try {
      return await this.FAMILY_STATUS_REPOSITORY.findOne<
        FamilyStatus | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async familyStatusList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<FamilyStatus[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.FAMILY_STATUS_REPOSITORY.findAll<FamilyStatus>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          familyStatusName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['familyStatusName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async familyStatusNameFind(familyStatusName: string): Promise<FamilyStatus> {
    try {
      return await this.FAMILY_STATUS_REPOSITORY.findOne<
        FamilyStatus | undefined
      >({
        where: { familyStatusName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'familyStatusNameFind',
    'familyStatusName',
    'familyStatus:validate:notUniqueFamilyStatusName',
  )
  async familyStatusCreate(
    data: FamilyStatusCreateInput,
  ): Promise<FamilyStatus> {
    try {
      return await this.FAMILY_STATUS_REPOSITORY.create<FamilyStatus>(data);
    } catch (error) {
      if (
        error.messageCode === 'familyStatus:validate:notUniqueFamilyStatusName'
      ) {
        throw new MessageCodeError(
          'familyStatus:validate:notUniqueFamilyStatusName',
        );
      }
      throw new MessageCodeError(
        'familyStatus:create:unableToCreateFamilyStatus',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'familyStatusNameFind',
    'familyStatusName',
    'familyStatus:validate:notUniqueFamilyStatusName',
  )
  async familyStatusUpdate(
    data: FamilyStatusUpdateInput,
  ): Promise<FamilyStatus> {
    try {
      const res = await this.FAMILY_STATUS_REPOSITORY.update<FamilyStatus>(
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
        error.messageCode === 'familyStatus:validate:notUniqueFamilyStatusName'
      ) {
        throw new MessageCodeError(
          'familyStatus:validate:notUniqueFamilyStatusName',
        );
      }
      throw new MessageCodeError(
        'familyStatus:update:unableToUpdateFamilyStatus',
      );
    }
  }

  @OptimisticLocking(false)
  async familyStatusDelete(data: FamilyStatusDeleteInput): Promise<Number> {
    try {
      return await this.FAMILY_STATUS_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
