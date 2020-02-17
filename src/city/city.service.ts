import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import City from './city.model';
import { CityCreateInput } from './input/city-create.input';
import { CityDeleteInput } from './input/city-delete.input';
import { CityUpdateInput } from './input/city-update.input';

@Injectable()
export class CityService {
  constructor(
    @Inject('CITY_REPOSITORY') private readonly CITY_REPOSITORY: typeof City,
  ) {}

  public async checkVersion(id: string): Promise<City | undefined> {
    try {
      return await this.CITY_REPOSITORY.findOne<City>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async city(id: number): Promise<City> {
    try {
      return await this.CITY_REPOSITORY.findOne<City | undefined>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async cityList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<City[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.CITY_REPOSITORY.findAll<City>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          cityName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['cityName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async cityNameFind(cityName: string): Promise<City> {
    try {
      return await this.CITY_REPOSITORY.findOne<City | undefined>({
        where: { cityName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async cityCreate(data: CityCreateInput): Promise<City> {
    try {
      const city = await this.cityNameFind(data.cityName);
      const cityName = city?.getDataValue('cityName');

      if (cityName) {
        throw new MessageCodeError('city:create:unableToCreateCity');
      }

      return await this.CITY_REPOSITORY.create<City>(data);
    } catch (err) {
      throw new MessageCodeError('city:create:unableToCreateCity');
    }
  }

  @OptimisticLocking(true)
  async cityUpdate(data: CityUpdateInput): Promise<City> {
    try {
      const res = await this.CITY_REPOSITORY.update<City>(
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
  async cityDelete(data: CityDeleteInput): Promise<Number> {
    try {
      const { id, version } = data;
      return await this.CITY_REPOSITORY.destroy({
        where: {
          [Op.and]: [{ id }, { version }],
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
