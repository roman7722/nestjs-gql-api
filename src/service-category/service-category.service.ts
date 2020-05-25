import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import ServiceCategory from './service-category.model';
import { ServiceCategoryCreateInputDto } from './dto/input/service-category-create.input.dto';
import { ServiceCategoryDeleteInputDto } from './dto/input/service-category-delete.input.dto';
import { ServiceCategoryUpdateInputDto } from './dto/input/service-category-update.input.dto';

@Injectable()
export class ServiceCategoryService {
  constructor(
    @Inject('SERVICE_CATEGORY_REPOSITORY')
    private readonly SERVICE_CATEGORY_REPOSITORY: typeof ServiceCategory,
  ) {}

  public async checkVersion(id: number): Promise<ServiceCategory | undefined> {
    try {
      return await this.SERVICE_CATEGORY_REPOSITORY.findOne<ServiceCategory>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async serviceCategory(id: number): Promise<ServiceCategory> {
    try {
      return await this.SERVICE_CATEGORY_REPOSITORY.findOne<
        ServiceCategory | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async serviceCategoryList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<ServiceCategory[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.SERVICE_CATEGORY_REPOSITORY.findAll<ServiceCategory>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          serviceCategoryName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['serviceCategoryName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async serviceCategoryNameFind(
    serviceCategoryName: string,
  ): Promise<ServiceCategory> {
    try {
      return await this.SERVICE_CATEGORY_REPOSITORY.findOne<
        ServiceCategory | undefined
      >({
        where: { serviceCategoryName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'serviceCategoryNameFind',
    'serviceCategoryName',
    'serviceCategory:validate:notUniqueServiceCategoryName',
  )
  async serviceCategoryCreate(
    data: ServiceCategoryCreateInputDto,
  ): Promise<ServiceCategory> {
    try {
      return await this.SERVICE_CATEGORY_REPOSITORY.create<ServiceCategory>(data);
    } catch (error) {
      if (
        error.messageCode ===
        'serviceCategory:validate:notUniqueServiceCategoryName'
      ) {
        throw new MessageCodeError(
          'serviceCategory:validate:notUniqueServiceCategoryName',
        );
      }
      throw new MessageCodeError(
        'serviceCategory:create:unableToCreateServiceCategory',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'serviceCategoryNameFind',
    'serviceCategoryName',
    'serviceCategory:validate:notUniqueServiceCategoryName',
  )
  async serviceCategoryUpdate(
    data: ServiceCategoryUpdateInputDto,
  ): Promise<ServiceCategory> {
    try {
      const res = await this.SERVICE_CATEGORY_REPOSITORY.update<ServiceCategory>(
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
        error.messageCode ===
        'serviceCategory:validate:notUniqueServiceCategoryName'
      ) {
        throw new MessageCodeError(
          'serviceCategory:validate:notUniqueServiceCategoryName',
        );
      }
      throw new MessageCodeError(
        'serviceCategory:update:unableToUpdateServiceCategory',
      );
    }
  }

  @OptimisticLocking(false)
  async serviceCategoryDelete(
    data: ServiceCategoryDeleteInputDto,
  ): Promise<Number> {
    try {
      return await this.SERVICE_CATEGORY_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
