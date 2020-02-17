import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { SocialStatusCreateInput } from './input/social-status-create.input';
import { SocialStatusDeleteInput } from './input/social-status-delete.input';
import { SocialStatusUpdateInput } from './input/social-status-update.input';
import SocialStatus from './social-status.model';

@Injectable()
export class SocialStatusService {
  constructor(
    @Inject('SOCIAL_STATUS_REPOSITORY')
    private readonly SOCIAL_STATUS_REPOSITORY: typeof SocialStatus,
  ) {}

  public async checkVersion(id: string): Promise<SocialStatus | undefined> {
    try {
      return await this.SOCIAL_STATUS_REPOSITORY.findOne<SocialStatus>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async socialStatus(id: number): Promise<SocialStatus> {
    try {
      return await this.SOCIAL_STATUS_REPOSITORY.findOne<
        SocialStatus | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async socialStatusList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<SocialStatus[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.SOCIAL_STATUS_REPOSITORY.findAll<SocialStatus>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          socialStatusName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['socialStatusName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async socialStatusNameFind(socialStatusName: string): Promise<SocialStatus> {
    try {
      return await this.SOCIAL_STATUS_REPOSITORY.findOne<
        SocialStatus | undefined
      >({
        where: { socialStatusName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async socialStatusCreate(
    data: SocialStatusCreateInput,
  ): Promise<SocialStatus> {
    try {
      const socialStatus = await this.socialStatusNameFind(
        data.socialStatusName,
      );
      const socialStatusName = socialStatus?.getDataValue('socialStatusName');

      if (socialStatusName) {
        throw new MessageCodeError(
          'socialStatus:create:unableToCreateSocialStatus',
        );
      }

      return await this.SOCIAL_STATUS_REPOSITORY.create<SocialStatus>(data);
    } catch (err) {
      throw new MessageCodeError(
        'socialStatus:create:unableToCreateSocialStatus',
      );
    }
  }

  @OptimisticLocking(true)
  async socialStatusUpdate(
    data: SocialStatusUpdateInput,
  ): Promise<SocialStatus> {
    try {
      const res = await this.SOCIAL_STATUS_REPOSITORY.update<SocialStatus>(
        data,
        {
          where: { id: data.id },
          returning: true,
        },
      );
      const [, [val]] = res;
      return val;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @OptimisticLocking(false)
  async socialStatusDelete(data: SocialStatusDeleteInput): Promise<Number> {
    try {
      const { id, version } = data;
      return await this.SOCIAL_STATUS_REPOSITORY.destroy({
        where: {
          [Op.and]: [{ id }, { version }],
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
