import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import AgreementStatus from './agreement-status.model';
import { AgreementStatusCreateInputDto } from './dto/input/agreement-status-create.input.dto';
import { AgreementStatusDeleteInputDto } from './dto/input/agreement-status-delete.input.dto';
import { AgreementStatusUpdateInputDto } from './dto/input/agreement-status-update.input.dto';

@Injectable()
export class AgreementStatusService {
  constructor(
    @Inject('AGREEMENT_STATUS_REPOSITORY')
    private readonly AGREEMENT_STATUS_REPOSITORY: typeof AgreementStatus,
  ) {}

  public async checkVersion(id: number): Promise<AgreementStatus | undefined> {
    try {
      return await this.AGREEMENT_STATUS_REPOSITORY.findOne<AgreementStatus>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async agreementStatus(id: number): Promise<AgreementStatus> {
    try {
      return await this.AGREEMENT_STATUS_REPOSITORY.findOne<
        AgreementStatus | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async agreementStatusList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<AgreementStatus[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.AGREEMENT_STATUS_REPOSITORY.findAll<AgreementStatus>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          agreementStatusName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['agreementStatusName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async agreementStatusNameFind(
    agreementStatusName: string,
  ): Promise<AgreementStatus> {
    try {
      return await this.AGREEMENT_STATUS_REPOSITORY.findOne<
        AgreementStatus | undefined
      >({
        where: { agreementStatusName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'agreementStatusNameFind',
    'agreementStatusName',
    'agreementStatus:validate:notUniqueAgreementStatusName',
  )
  async agreementStatusCreate(
    data: AgreementStatusCreateInputDto,
  ): Promise<AgreementStatus> {
    try {
      return await this.AGREEMENT_STATUS_REPOSITORY.create<AgreementStatus>(
        data,
      );
    } catch (error) {
      if (
        error.messageCode ===
        'agreementStatus:validate:notUniqueAgreementStatusName'
      ) {
        throw new MessageCodeError(
          'agreementStatus:validate:notUniqueAgreementStatusName',
        );
      }
      throw new MessageCodeError(
        'agreementStatus:create:unableToCreateAgreementStatus',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'agreementStatusNameFind',
    'agreementStatusName',
    'agreementStatus:validate:notUniqueAgreementStatusName',
  )
  async agreementStatusUpdate(
    data: AgreementStatusUpdateInputDto,
  ): Promise<AgreementStatus> {
    try {
      const res = await this.AGREEMENT_STATUS_REPOSITORY.update<
        AgreementStatus
      >(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (
        error.messageCode ===
        'agreementStatus:validate:notUniqueAgreementStatusName'
      ) {
        throw new MessageCodeError(
          'agreementStatus:validate:notUniqueAgreementStatusName',
        );
      }
      throw new MessageCodeError(
        'agreementStatus:update:unableToUpdateAgreementStatus',
      );
    }
  }

  @OptimisticLocking(false)
  async agreementStatusDelete(
    data: AgreementStatusDeleteInputDto,
  ): Promise<Number> {
    try {
      return await this.AGREEMENT_STATUS_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
