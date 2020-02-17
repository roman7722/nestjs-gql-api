import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error';
import District from './district.model';
import { DistrictCreateInput } from './input/district-create.input';
import { DistrictDeleteInput } from './input/district-delete.input';
import { DistrictUpdateInput } from './input/district-update.input';

@Injectable()
export class DistrictService {
  constructor(
    @Inject('DISTRICT_REPOSITORY')
    private readonly DISTRICT_REPOSITORY: typeof District,
  ) {}

  public async checkVersion(id: number): Promise<District | undefined> {
    try {
      return await this.DISTRICT_REPOSITORY.findOne<District>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async district(id: number): Promise<District> {
    try {
      return await this.DISTRICT_REPOSITORY.findOne<District | undefined>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async districtList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<District[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.DISTRICT_REPOSITORY.findAll<District>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          districtName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['districtName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async districtNameFind(districtName: string): Promise<District> {
    try {
      return await this.DISTRICT_REPOSITORY.findOne<District | undefined>({
        where: { districtName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async districtCreate(data: DistrictCreateInput): Promise<District> {
    try {
      const district = await this.districtNameFind(data.districtName);
      const districtName = district?.getDataValue('districtName');

      if (districtName) {
        throw new MessageCodeError('district:create:unableToCreateDistrict');
      }

      return await this.DISTRICT_REPOSITORY.create<District>({
        ...data,
      });
    } catch (err) {
      throw new MessageCodeError('district:create:unableToCreateDistrict');
    }
  }

  @OptimisticLocking(true)
  async districtUpdate(data: DistrictUpdateInput): Promise<District> {
    try {
      const res = await this.DISTRICT_REPOSITORY.update<District>(
        {
          ...data,
        },
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
  async districtDelete(data: DistrictDeleteInput): Promise<Number> {
    try {
      const { id, version } = data;
      return await this.DISTRICT_REPOSITORY.destroy({
        where: {
          [Op.and]: [{ id }, { version }],
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
