import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import Customer from './customer.model';
import { CustomerCreateInput } from './input/customer-create.input';
import { CustomerDeleteInput } from './input/customer-delete.input';
import { CustomerUpdateInput } from './input/customer-update.input';

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
          customerName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['customerName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async customerNameFind(customerName: string): Promise<Customer> {
    try {
      return await this.CUSTOMER_REPOSITORY.findOne<Customer | undefined>({
        where: { customerName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async customerCreate(data: CustomerCreateInput): Promise<Customer> {
    try {
      return await this.CUSTOMER_REPOSITORY.create<Customer>(data);
    } catch (error) {
      throw new MessageCodeError('customer:create:unableToCreateCustomer');
    }
  }

  @OptimisticLocking(true)
  async customerUpdate(data: CustomerUpdateInput): Promise<Customer> {
    try {
      const res = await this.CUSTOMER_REPOSITORY.update<Customer>(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      throw new MessageCodeError('customer:update:unableToUpdateCustomer');
    }
  }

  @OptimisticLocking(false)
  async customerDelete(data: CustomerDeleteInput): Promise<Number> {
    try {
      return await this.CUSTOMER_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
