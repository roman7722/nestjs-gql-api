import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CustomerCategoryService } from './customer-category.service';
import { CustomerCategoryListArgsDto } from './dto/args/customer-category-list.args.dto';
import { CustomerCategoryArgsDto } from './dto/args/customer-category.args.dto';
import { CustomerCategoryDto } from './dto/customer-category.dto';
import { CustomerCategoryCreateInputDto } from './dto/input/customer-category-create.input.dto';
import { CustomerCategoryDeleteInputDto } from './dto/input/customer-category-delete.input.dto';
import { CustomerCategoryUpdateInputDto } from './dto/input/customer-category-update.input.dto';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class CustomerCategoryResolver {
  constructor(
    private readonly customerCategoryService: CustomerCategoryService,
  ) {}

  @Query(() => CustomerCategoryDto, {
    nullable: true,
    description: 'Поиск категории клиента по id',
  })
  async customerCategory(@Args() { id }: CustomerCategoryArgsDto) {
    return await this.customerCategoryService.customerCategory(id);
  }

  @Query(() => [CustomerCategoryDto], {
    nullable: true,
    description: 'Поиск категории клиента по наименованию и пагинация',
  })
  async customerCategoryList(
    @Args() { textFilter, page, paging }: CustomerCategoryListArgsDto,
  ) {
    return this.customerCategoryService.customerCategoryList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => CustomerCategoryDto)
  async customerCategoryCreate(
    @Args('data') data: CustomerCategoryCreateInputDto,
  ) {
    return await this.customerCategoryService.customerCategoryCreate(data);
  }

  @Mutation(() => CustomerCategoryDto)
  async customerCategoryUpdate(
    @Args('data') data: CustomerCategoryUpdateInputDto,
  ) {
    return await this.customerCategoryService.customerCategoryUpdate(data);
  }

  @Mutation(() => Int)
  async customerCategoryDelete(
    @Args('data') data: CustomerCategoryDeleteInputDto,
  ) {
    return await this.customerCategoryService.customerCategoryDelete(data);
  }
}
