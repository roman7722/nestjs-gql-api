import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { WhatAboutUsCreateInputDto } from './dto/input/what-about-us-create.input.dto';
import { WhatAboutUsDeleteInputDto } from './dto/input/what-about-us-delete.input.dto';
import { WhatAboutUsUpdateInputDto } from './dto/input/what-about-us-update.input.dto';
import WhatAboutUs from './what-about-us.model';

@Injectable()
export class WhatAboutUsService {
  constructor(
    @Inject('WHAT_ABOUT_US_REPOSITORY')
    private readonly WHAT_ABOUT_US_REPOSITORY: typeof WhatAboutUs,
  ) {}

  public async checkVersion(id: number): Promise<WhatAboutUs | undefined> {
    try {
      return await this.WHAT_ABOUT_US_REPOSITORY.findOne<WhatAboutUs>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async whatAboutUs(id: number): Promise<WhatAboutUs> {
    try {
      return await this.WHAT_ABOUT_US_REPOSITORY.findOne<
        WhatAboutUs | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async whatAboutUsList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<WhatAboutUs[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.WHAT_ABOUT_US_REPOSITORY.findAll<WhatAboutUs>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          whatAboutUsName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['whatAboutUsName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async whatAboutUsNameFind(whatAboutUsName: string): Promise<WhatAboutUs> {
    try {
      return await this.WHAT_ABOUT_US_REPOSITORY.findOne<
        WhatAboutUs | undefined
      >({
        where: { whatAboutUsName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'whatAboutUsNameFind',
    'whatAboutUsName',
    'whatAboutUs:validate:notUniqueWhatAboutUsName',
  )
  async whatAboutUsCreate(
    data: WhatAboutUsCreateInputDto,
  ): Promise<WhatAboutUs> {
    try {
      return await this.WHAT_ABOUT_US_REPOSITORY.create<WhatAboutUs>(data);
    } catch (error) {
      if (
        error.messageCode === 'whatAboutUs:validate:notUniqueWhatAboutUsName'
      ) {
        throw new MessageCodeError(
          'whatAboutUs:validate:notUniqueWhatAboutUsName',
        );
      }
      throw new MessageCodeError(
        'whatAboutUs:create:unableToCreateWhatAboutUs',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'whatAboutUsNameFind',
    'whatAboutUsName',
    'whatAboutUs:validate:notUniqueWhatAboutUsName',
  )
  async whatAboutUsUpdate(
    data: WhatAboutUsUpdateInputDto,
  ): Promise<WhatAboutUs> {
    try {
      const res = await this.WHAT_ABOUT_US_REPOSITORY.update<WhatAboutUs>(
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
        error.messageCode === 'whatAboutUs:validate:notUniqueWhatAboutUsName'
      ) {
        throw new MessageCodeError(
          'whatAboutUs:validate:notUniqueWhatAboutUsName',
        );
      }
      throw new MessageCodeError(
        'whatAboutUs:update:unableToUpdateWhatAboutUs',
      );
    }
  }

  @OptimisticLocking(false)
  async whatAboutUsDelete(data: WhatAboutUsDeleteInputDto): Promise<Number> {
    try {
      return await this.WHAT_ABOUT_US_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
