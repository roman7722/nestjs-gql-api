import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AgreementService } from '../agreement/agreement.service';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { ServicePackCreateInputDto } from './dto/input/service-pack-create.input.dto';
import { ServicePackDeleteInputDto } from './dto/input/service-pack-delete.input.dto';
import { ServicePackUpdateInputDto } from './dto/input/service-pack-update.input.dto';
import ServicePack from './service-pack.model';

@Injectable()
export class ServicePackService {
  constructor(
    @Inject('SERVICE_PACK_REPOSITORY')
    private readonly SERVICE_PACK_REPOSITORY: typeof ServicePack,
    private readonly agreementService: AgreementService,
  ) {}

  public async checkVersion(id: number): Promise<ServicePack | undefined> {
    try {
      return await this.SERVICE_PACK_REPOSITORY.findOne<ServicePack>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async servicePack(id: number): Promise<ServicePack> {
    try {
      return await this.SERVICE_PACK_REPOSITORY.findOne<
        ServicePack | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async servicePackList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<ServicePack[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})|(\(${textFilter})|('/'${textFilter})`;
      return await this.SERVICE_PACK_REPOSITORY.findAll<ServicePack>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          agreementData: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['agreementData', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getAgreementData(id: number): Promise<string> {
    const agreement = await this.agreementService.agreement(id);

    const agreementNumber = agreement.getDataValue('agreementNumber');
    const customerSecondName = agreement
      .getDataValue('customer')
      .getDataValue('secondName');
    const wardSecondName = agreement
      .getDataValue('ward')
      .getDataValue('secondName');

    return `${agreementNumber} (${customerSecondName}/${wardSecondName})`;
  }

  async servicePackCreate(
    data: ServicePackCreateInputDto,
  ): Promise<ServicePack> {
    try {
      const agreementData = await this.getAgreementData(data.agreementId);

      return await this.SERVICE_PACK_REPOSITORY.create<ServicePack>({
        ...data,
        agreementData,
      });
    } catch (error) {
      throw new MessageCodeError(
        'servicePack:create:unableToCreateServicePack',
      );
    }
  }

  @OptimisticLocking(true)
  async servicePackUpdate(
    data: ServicePackUpdateInputDto,
  ): Promise<ServicePack> {
    try {
      const agreementData = await this.getAgreementData(data.agreementId);

      const res = await this.SERVICE_PACK_REPOSITORY.update<ServicePack>(
        {
          ...data,
          agreementData,
        },
        {
          where: { id: data.id },
          returning: true,
        },
      );
      const [, [val]] = res;
      return val;
    } catch (error) {
      throw new MessageCodeError(
        'servicePack:update:unableToUpdateServicePack',
      );
    }
  }

  @OptimisticLocking(false)
  async servicePackDelete(data: ServicePackDeleteInputDto): Promise<Number> {
    try {
      return await this.SERVICE_PACK_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
