import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ServiceCategoryListArgsDto } from './dto/args/service-category-list.args.dto';
import { ServiceCategoryArgsDto } from './dto/args/service-category.args.dto';
import { ServiceCategoryCreateInputDto } from './dto/input/service-category-create.input.dto';
import { ServiceCategoryDeleteInputDto } from './dto/input/service-category-delete.input.dto';
import { ServiceCategoryUpdateInputDto } from './dto/input/service-category-update.input.dto';
import { ServiceCategoryDto } from './dto/service-category.dto';
import { ServiceCategoryService } from './service-category.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class ServiceCategoryResolver {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Query(() => ServiceCategoryDto, {
    nullable: true,
    description: 'Поиск категории услуги по id',
  })
  async serviceCategory(@Args() { id }: ServiceCategoryArgsDto) {
    return await this.serviceCategoryService.serviceCategory(id);
  }

  @Query(() => [ServiceCategoryDto], {
    nullable: true,
    description: 'Поиск категории услуги по наименованию и пагинация',
  })
  async serviceCategoryList(
    @Args() { textFilter, page, paging }: ServiceCategoryListArgsDto,
  ) {
    return this.serviceCategoryService.serviceCategoryList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => ServiceCategoryDto)
  async serviceCategoryCreate(
    @Args('data') data: ServiceCategoryCreateInputDto,
  ) {
    return await this.serviceCategoryService.serviceCategoryCreate(data);
  }

  @Mutation(() => ServiceCategoryDto)
  async serviceCategoryUpdate(
    @Args('data') data: ServiceCategoryUpdateInputDto,
  ) {
    return await this.serviceCategoryService.serviceCategoryUpdate(data);
  }

  @Mutation(() => Int)
  async serviceCategoryDelete(
    @Args('data') data: ServiceCategoryDeleteInputDto,
  ) {
    return await this.serviceCategoryService.serviceCategoryDelete(data);
  }
}
