import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import Customer from './customer.model';
import { CustomerCreateInputDto } from './dto/input/customer-create.input.dto';
import { CustomerDeleteInputDto } from './dto/input/customer-delete.input.dto';
import { CustomerUpdateInputDto } from './dto/input/customer-update.input.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly CUSTOMER_REPOSITORY: typeof Customer,
  ) {}

  public async checkVersion(id: number): Promise<Customer | undefined> {
    try {
      return await this.CUSTOMER_REPOSITORY.findOne<Customer>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async customer(id: number): Promise<Customer> {
    try {
      return await this.CUSTOMER_REPOSITORY.findOne<Customer | undefined>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async customerList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<Customer[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.CUSTOMER_REPOSITORY.findAll<Customer>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          displayName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['displayName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async passportNumberFind(passportNumber: string): Promise<Customer> {
    try {
      return await this.CUSTOMER_REPOSITORY.findOne<Customer | undefined>({
        where: { passportNumber },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'passportNumberFind',
    'passportNumber',
    'customer:validate:notUniquePassportNumber',
  )
  async customerCreate(data: CustomerCreateInputDto): Promise<Customer> {
    try {
      return await this.CUSTOMER_REPOSITORY.create<Customer>({
        ...data,
        displayName: `${data.secondName} ${data.firstName} ${data.middleName}`,
      });
    } catch (error) {
      throw new MessageCodeError('customer:create:unableToCreateCustomer');
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'passportNumberFind',
    'passportNumber',
    'customer:validate:notUniquePassportNumber',
  )
  async customerUpdate(data: CustomerUpdateInputDto): Promise<Customer> {
    try {
      const res = await this.CUSTOMER_REPOSITORY.update<Customer>(
        {
          ...data,
          displayName: `${data.secondName} ${data.firstName} ${data.middleName}`,
        },
        {
          where: { id: data.id },
          returning: true,
        },
      );
      const [, [val]] = res;
      return val;
    } catch (error) {
      throw new MessageCodeError('customer:update:unableToUpdateCustomer');
    }
  }

  @OptimisticLocking(false)
  async customerDelete(data: CustomerDeleteInputDto): Promise<Number> {
    try {
      return await this.CUSTOMER_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
