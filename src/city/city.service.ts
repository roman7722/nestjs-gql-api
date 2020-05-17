import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import City from './city.model';
import { CityCreateInputDto } from './dto/input/city-create.input.dto';
import { CityDeleteInputDto } from './dto/input/city-delete.input.dto';
import { CityUpdateInputDto } from './dto/input/city-update.input.dto';

@Injectable()
export class CityService {
  constructor(
    @Inject('CITY_REPOSITORY') private readonly CITY_REPOSITORY: typeof City,
  ) {}

  public async checkVersion(id: number): Promise<City | undefined> {
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

  @CheckIsValueUnique(
    'cityNameFind',
    'cityName',
    'city:validate:notUniqueCityName',
  )
  async cityCreate(data: CityCreateInputDto): Promise<City> {
    try {
      return await this.CITY_REPOSITORY.create<City>(data);
    } catch (error) {
      if (error.messageCode === 'city:validate:notUniqueCityName') {
        throw new MessageCodeError('city:validate:notUniqueCityName');
      }
      throw new MessageCodeError('city:create:unableToCreateCity');
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'cityNameFind',
    'cityName',
    'city:validate:notUniqueCityName',
  )
  async cityUpdate(data: CityUpdateInputDto): Promise<City> {
    try {
      const res = await this.CITY_REPOSITORY.update<City>(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (error.messageCode === 'city:validate:notUniqueCityName') {
        throw new MessageCodeError('city:validate:notUniqueCityName');
      }
      throw new MessageCodeError('city:update:unableToUpdateCity');
    }
  }

  @OptimisticLocking(false)
  async cityDelete(data: CityDeleteInputDto): Promise<Number> {
    try {
      return await this.CITY_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
