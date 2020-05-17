import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SubjectCategoryListArgsDto } from './dto/args/subject-category-list.args.dto';
import { SubjectCategoryArgsDto } from './dto/args/subject-category.args.dto';
import { SubjectCategoryCreateInputDto } from './dto/input/subject-category-create.input.dto';
import { SubjectCategoryDeleteInputDto } from './dto/input/subject-category-delete.input.dto';
import { SubjectCategoryUpdateInputDto } from './dto/input/subject-category-update.input.dto';
import { SubjectCategoryDto } from './dto/subject-category.dto';
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
  async subjectCategory(@Args() { id }: SubjectCategoryArgsDto) {
    return await this.subjectCategoryService.subjectCategory(id);
  }

  @Query(() => [SubjectCategoryDto], {
    nullable: true,
    description: 'Поиск категории субъекта по наименованию и пагинация',
  })
  async subjectCategoryList(
    @Args() { textFilter, page, paging }: SubjectCategoryListArgsDto,
  ) {
    return this.subjectCategoryService.subjectCategoryList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => SubjectCategoryDto)
  async subjectCategoryCreate(
    @Args('data') data: SubjectCategoryCreateInputDto,
  ) {
    return await this.subjectCategoryService.subjectCategoryCreate(data);
  }

  @Mutation(() => SubjectCategoryDto)
  async subjectCategoryUpdate(
    @Args('data') data: SubjectCategoryUpdateInputDto,
  ) {
    return await this.subjectCategoryService.subjectCategoryUpdate(data);
  }

  @Mutation(() => Int)
  async subjectCategoryDelete(
    @Args('data') data: SubjectCategoryDeleteInputDto,
  ) {
    return await this.subjectCategoryService.subjectCategoryDelete(data);
  }
}
