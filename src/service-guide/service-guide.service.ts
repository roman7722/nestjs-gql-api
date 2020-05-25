import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import ServiceCategory from '../service-category/service-category.model';
import { ServiceGuideCreateInputDto } from './dto/input/service-guide-create.input.dto';
import { ServiceGuideDeleteInputDto } from './dto/input/service-guide-delete.input.dto';
import { ServiceGuideUpdateInputDto } from './dto/input/service-guide-update.input.dto';
import ServiceGuide from './service-guide.model';

@Injectable()
export class ServiceGuideService {
  constructor(
    @Inject('SERVICE_GUIDE_REPOSITORY')
    private readonly SERVICE_GUIDE_REPOSITORY: typeof ServiceGuide,
  ) {}

  public async checkVersion(id: number): Promise<ServiceGuide | undefined> {
    try {
      return await this.SERVICE_GUIDE_REPOSITORY.findOne<ServiceGuide>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async serviceGuide(id: number): Promise<ServiceGuide> {
    try {
      return await this.SERVICE_GUIDE_REPOSITORY.findOne<
        ServiceGuide | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async serviceGuideList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<ServiceGuide[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.SERVICE_GUIDE_REPOSITORY.findAll<ServiceGuide>({
        limit: paging,
        offset: (page - 1) * paging,
        include: [ServiceCategory],
        where: {
          serviceGuideName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['serviceGuideName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async serviceGuideNameFind(serviceGuideName: string): Promise<ServiceGuide> {
    try {
      return await this.SERVICE_GUIDE_REPOSITORY.findOne<
        ServiceGuide | undefined
      >({
        where: { serviceGuideName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'serviceGuideNameFind',
    'serviceGuideName',
    'serviceGuide:validate:notUniqueServiceGuideName',
  )
  async serviceGuideCreate(
    data: ServiceGuideCreateInputDto,
  ): Promise<ServiceGuide> {
    try {
      return await this.SERVICE_GUIDE_REPOSITORY.create<ServiceGuide>(data);
    } catch (error) {
      if (
        error.messageCode === 'serviceGuide:validate:notUniqueServiceGuideName'
      ) {
        throw new MessageCodeError(
          'serviceGuide:validate:notUniqueServiceGuideName',
        );
      }
      throw new MessageCodeError(
        'serviceGuide:create:unableToCreateServiceGuide',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'serviceGuideNameFind',
    'serviceGuideName',
    'serviceGuide:validate:notUniqueServiceGuideName',
  )
  async serviceGuideUpdate(
    data: ServiceGuideUpdateInputDto,
  ): Promise<ServiceGuide> {
    try {
      const res = await this.SERVICE_GUIDE_REPOSITORY.update<ServiceGuide>(
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
        error.messageCode === 'serviceGuide:validate:notUniqueServiceGuideName'
      ) {
        throw new MessageCodeError(
          'serviceGuide:validate:notUniqueServiceGuideName',
        );
      }
      throw new MessageCodeError(
        'serviceGuide:update:unableToUpdateServiceGuide',
      );
    }
  }

  @OptimisticLocking(false)
  async serviceGuideDelete(data: ServiceGuideDeleteInputDto): Promise<Number> {
    try {
      return await this.SERVICE_GUIDE_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
