import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { PaymentStatusCreateInputDto } from './dto/input/payment-status-create.input.dto';
import { PaymentStatusDeleteInputDto } from './dto/input/payment-status-delete.input.dto';
import { PaymentStatusUpdateInputDto } from './dto/input/payment-status-update.input.dto';
import PaymentStatus from './payment-status.model';

@Injectable()
export class PaymentStatusService {
  constructor(
    @Inject('PAYMENT_STATUS_REPOSITORY')
    private readonly PAYMENT_STATUS_REPOSITORY: typeof PaymentStatus,
  ) {}

  public async checkVersion(id: number): Promise<PaymentStatus | undefined> {
    try {
      return await this.PAYMENT_STATUS_REPOSITORY.findOne<PaymentStatus>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async paymentStatus(id: number): Promise<PaymentStatus> {
    try {
      return await this.PAYMENT_STATUS_REPOSITORY.findOne<
        PaymentStatus | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async paymentStatusList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<PaymentStatus[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.PAYMENT_STATUS_REPOSITORY.findAll<PaymentStatus>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          paymentStatusName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['paymentStatusName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async paymentStatusNameFind(
    paymentStatusName: string,
  ): Promise<PaymentStatus> {
    try {
      return await this.PAYMENT_STATUS_REPOSITORY.findOne<
        PaymentStatus | undefined
      >({
        where: { paymentStatusName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'paymentStatusNameFind',
    'paymentStatusName',
    'paymentStatus:validate:notUniquePaymentStatusName',
  )
  async paymentStatusCreate(
    data: PaymentStatusCreateInputDto,
  ): Promise<PaymentStatus> {
    try {
      return await this.PAYMENT_STATUS_REPOSITORY.create<PaymentStatus>(data);
    } catch (error) {
      if (
        error.messageCode ===
        'paymentStatus:validate:notUniquePaymentStatusName'
      ) {
        throw new MessageCodeError(
          'paymentStatus:validate:notUniquePaymentStatusName',
        );
      }
      throw new MessageCodeError(
        'paymentStatus:create:unableToCreatePaymentStatus',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'paymentStatusNameFind',
    'paymentStatusName',
    'paymentStatus:validate:notUniquePaymentStatusName',
  )
  async paymentStatusUpdate(
    data: PaymentStatusUpdateInputDto,
  ): Promise<PaymentStatus> {
    try {
      const res = await this.PAYMENT_STATUS_REPOSITORY.update<PaymentStatus>(
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
        'paymentStatus:validate:notUniquePaymentStatusName'
      ) {
        throw new MessageCodeError(
          'paymentStatus:validate:notUniquePaymentStatusName',
        );
      }
      throw new MessageCodeError(
        'paymentStatus:update:unableToUpdatePaymentStatus',
      );
    }
  }

  @OptimisticLocking(false)
  async paymentStatusDelete(
    data: PaymentStatusDeleteInputDto,
  ): Promise<Number> {
    try {
      return await this.PAYMENT_STATUS_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
