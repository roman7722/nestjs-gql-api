import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MessageCodeError } from '../common/lib/error/MessageCodeError';
import City from './city.model';
import { CityCreateInput } from './input/city-create.input';
import { CityUpdateInput } from './input/city-update.input';

@Injectable()
export class CityService {
  constructor(
    @Inject('CITY_REPOSITORY') private readonly CITY_REPOSITORY: typeof City,
  ) {}

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

      return await this.CITY_REPOSITORY.create<City>({
        ...data,
      });
    } catch (err) {
      throw new MessageCodeError('city:create:unableToCreateCity');
    }
  }

  async cityUpdate(val: CityUpdateInput): Promise<number> {
    try {
      const res = await this.CITY_REPOSITORY.update<City>(
        {
          ...val,
        },
        {
          where: { id: val.id },
          returning: true,
          individualHooks: true,
        },
      );
      const [, [data]] = res;
      return data.getDataValue('id');
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async cityDelete(id: number): Promise<number> {
    try {
      const result = await this.CITY_REPOSITORY.destroy({
        where: { id },
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
