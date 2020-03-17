import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import CustomerCategory from './customer-category.model';
import { CustomerCategoryCreateInput } from './input/customer-category-create.input';
import { CustomerCategoryDeleteInput } from './input/customer-category-delete.input';
import { CustomerCategoryUpdateInput } from './input/customer-category-update.input';

@Injectable()
export class CustomerCategoryService {
  constructor(
    @Inject('CUSTOMER_CATEGORY_REPOSITORY')
    private readonly CUSTOMER_CATEGORY_REPOSITORY: typeof CustomerCategory,
  ) {}

  public async checkVersion(id: number): Promise<CustomerCategory | undefined> {
    try {
      return await this.CUSTOMER_CATEGORY_REPOSITORY.findOne<CustomerCategory>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async customerCategory(id: number): Promise<CustomerCategory> {
    try {
      return await this.CUSTOMER_CATEGORY_REPOSITORY.findOne<
        CustomerCategory | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async customerCategoryList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<CustomerCategory[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.CUSTOMER_CATEGORY_REPOSITORY.findAll<CustomerCategory>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          customerCategoryName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['customerCategoryName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async customerCategoryNameFind(
    customerCategoryName: string,
  ): Promise<CustomerCategory> {
    try {
      return await this.CUSTOMER_CATEGORY_REPOSITORY.findOne<
        CustomerCategory | undefined
      >({
        where: { customerCategoryName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'customerCategoryNameFind',
    'customerCategoryName',
    'customerCategory:validate:notUniqueCustomerCategoryName',
  )
  async customerCategoryCreate(
    data: CustomerCategoryCreateInput,
  ): Promise<CustomerCategory> {
    try {
      return await this.CUSTOMER_CATEGORY_REPOSITORY.create<CustomerCategory>(data);
    } catch (error) {
      if (
        error.messageCode ===
        'customerCategory:validate:notUniqueCustomerCategoryName'
      ) {
        throw new MessageCodeError(
          'customerCategory:validate:notUniqueCustomerCategoryName',
        );
      }
      throw new MessageCodeError(
        'customerCategory:create:unableToCreateCustomerCategory',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'customerCategoryNameFind',
    'customerCategoryName',
    'customerCategory:validate:notUniqueCustomerCategoryName',
  )
  async customerCategoryUpdate(
    data: CustomerCategoryUpdateInput,
  ): Promise<CustomerCategory> {
    try {
      const res = await this.CUSTOMER_CATEGORY_REPOSITORY.update<CustomerCategory>(
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
        'customerCategory:validate:notUniqueCustomerCategoryName'
      ) {
        throw new MessageCodeError(
          'customerCategory:validate:notUniqueCustomerCategoryName',
        );
      }
      throw new MessageCodeError(
        'customerCategory:update:unableToUpdateCustomerCategory',
      );
    }
  }

  @OptimisticLocking(false)
  async customerCategoryDelete(data: CustomerCategoryDeleteInput): Promise<Number> {
    try {
      return await this.CUSTOMER_CATEGORY_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
