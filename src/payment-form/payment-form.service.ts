import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { PaymentFormCreateInputDto } from './dto/input/payment-form-create.input.dto';
import { PaymentFormDeleteInputDto } from './dto/input/payment-form-delete.input.dto';
import { PaymentFormUpdateInputDto } from './dto/input/payment-form-update.input.dto';
import PaymentForm from './payment-form.model';

@Injectable()
export class PaymentFormService {
  constructor(
    @Inject('PAYMENT_FORM_REPOSITORY')
    private readonly PAYMENT_FORM_REPOSITORY: typeof PaymentForm,
  ) {}

  public async checkVersion(id: number): Promise<PaymentForm | undefined> {
    try {
      return await this.PAYMENT_FORM_REPOSITORY.findOne<PaymentForm>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async paymentForm(id: number): Promise<PaymentForm> {
    try {
      return await this.PAYMENT_FORM_REPOSITORY.findOne<
        PaymentForm | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async paymentFormList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<PaymentForm[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.PAYMENT_FORM_REPOSITORY.findAll<PaymentForm>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          paymentFormName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['paymentFormName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async paymentFormNameFind(paymentFormName: string): Promise<PaymentForm> {
    try {
      return await this.PAYMENT_FORM_REPOSITORY.findOne<
        PaymentForm | undefined
      >({
        where: { paymentFormName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'paymentFormNameFind',
    'paymentFormName',
    'paymentForm:validate:notUniquePaymentFormName',
  )
  async paymentFormCreate(
    data: PaymentFormCreateInputDto,
  ): Promise<PaymentForm> {
    try {
      return await this.PAYMENT_FORM_REPOSITORY.create<PaymentForm>(data);
    } catch (error) {
      if (
        error.messageCode === 'paymentForm:validate:notUniquePaymentFormName'
      ) {
        throw new MessageCodeError(
          'paymentForm:validate:notUniquePaymentFormName',
        );
      }
      throw new MessageCodeError(
        'paymentForm:create:unableToCreatePaymentForm',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'paymentFormNameFind',
    'paymentFormName',
    'paymentForm:validate:notUniquePaymentFormName',
  )
  async paymentFormUpdate(
    data: PaymentFormUpdateInputDto,
  ): Promise<PaymentForm> {
    try {
      const res = await this.PAYMENT_FORM_REPOSITORY.update<PaymentForm>(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (
        error.messageCode === 'paymentForm:validate:notUniquePaymentFormName'
      ) {
        throw new MessageCodeError(
          'paymentForm:validate:notUniquePaymentFormName',
        );
      }
      throw new MessageCodeError(
        'paymentForm:update:unableToUpdatePaymentForm',
      );
    }
  }

  @OptimisticLocking(false)
  async paymentFormDelete(data: PaymentFormDeleteInputDto): Promise<Number> {
    try {
      return await this.PAYMENT_FORM_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
