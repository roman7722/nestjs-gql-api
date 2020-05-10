import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SubjectCategoryListArgs } from './args/subject-category-list.args';
import { SubjectCategoryArgs } from './args/subject-category.args';
import { SubjectCategoryDto } from './dto/subject-category.dto';
import { SubjectCategoryCreateInput } from './input/subject-category-create.input';
import { SubjectCategoryDeleteInput } from './input/subject-category-delete.input';
import { SubjectCategoryUpdateInput } from './input/subject-category-update.input';
import { SubjectCategoryService } from './subject-category.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class SubjectCategoryResolver {
  constructor(
    private readonly subjectCategoryService: SubjectCategoryService,
  ) {}

  @Query(() => SubjectCategoryDto, {
    nullable: true,
    description: 'Поиск категории субъекта по id',
  })
  async subjectCategory(@Args() { id }: SubjectCategoryArgs) {
    return await this.subjectCategoryService.subjectCategory(id);
  }

  @Query(() => [SubjectCategoryDto], {
    nullable: true,
    description: 'Поиск категории субъекта по наименованию и пагинация',
  })
  async subjectCategoryList(
    @Args() { textFilter, page, paging }: SubjectCategoryListArgs,
  ) {
    return this.subjectCategoryService.subjectCategoryList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => SubjectCategoryDto)
  async subjectCategoryCreate(@Args('data') data: SubjectCategoryCreateInput) {
    return await this.subjectCategoryService.subjectCategoryCreate(data);
  }

  @Mutation(() => SubjectCategoryDto)
  async subjectCategoryUpdate(@Args('data') data: SubjectCategoryUpdateInput) {
    return await this.subjectCategoryService.subjectCategoryUpdate(data);
  }

  @Mutation(() => Int)
  async subjectCategoryDelete(@Args('data') data: SubjectCategoryDeleteInput) {
    return await this.subjectCategoryService.subjectCategoryDelete(data);
  }
}
