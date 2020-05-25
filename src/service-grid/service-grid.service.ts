import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import ServiceCategory from '../service-category/service-category.model';
import ServiceGuide from '../service-guide/service-guide.model';
import { ServiceGridCreateInputDto } from './dto/input/service-grid-create.input.dto';
import { ServiceGridDeleteInputDto } from './dto/input/service-grid-delete.input.dto';
import { ServiceGridUpdateInputDto } from './dto/input/service-grid-update.input.dto';
import ServiceGrid from './service-grid.model';

@Injectable()
export class ServiceGridService {
  constructor(
    @Inject('SERVICE_GRID_REPOSITORY')
    private readonly SERVICE_GRID_REPOSITORY: typeof ServiceGrid,
  ) {}

  public async checkVersion(id: number): Promise<ServiceGrid | undefined> {
    try {
      return await this.SERVICE_GRID_REPOSITORY.findOne<ServiceGrid>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async serviceGrid(id: number): Promise<ServiceGrid> {
    try {
      return await this.SERVICE_GRID_REPOSITORY.findOne<
        ServiceGrid | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async serviceGridList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<ServiceGrid[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.SERVICE_GRID_REPOSITORY.findAll<ServiceGrid>({
        limit: paging,
        offset: (page - 1) * paging,
        include: [
          { model: ServiceCategory },
          {
            model: ServiceGuide,
            where: {
              serviceGuideName: {
                [Op.iRegexp]: iRegexp,
              },
            },
          },
        ],
        order: [['id', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async serviceGridCreate(
    data: ServiceGridCreateInputDto,
  ): Promise<ServiceGrid> {
    try {
      return await this.SERVICE_GRID_REPOSITORY.create<ServiceGrid>(data);
    } catch (error) {
      throw new MessageCodeError(
        'serviceGrid:create:unableToCreateServiceGrid',
      );
    }
  }

  @OptimisticLocking(true)
  async serviceGridUpdate(
    data: ServiceGridUpdateInputDto,
  ): Promise<ServiceGrid> {
    try {
      const res = await this.SERVICE_GRID_REPOSITORY.update<ServiceGrid>(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (
        error.messageCode === 'serviceGrid:validate:notUniqueServiceGridName'
      ) {
        throw new MessageCodeError(
          'serviceGrid:validate:notUniqueServiceGridName',
        );
      }
      throw new MessageCodeError(
        'serviceGrid:update:unableToUpdateServiceGrid',
      );
    }
  }

  @OptimisticLocking(false)
  async serviceGridDelete(data: ServiceGridDeleteInputDto): Promise<Number> {
    try {
      return await this.SERVICE_GRID_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
