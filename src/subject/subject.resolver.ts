import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SubjectListArgs } from './args/subject-list.args';
import { SubjectArgs } from './args/subject.args';
import { SubjectDto } from './dto/subject.dto';
import { SubjectCreateInput } from './input/subject-create.input';
import { SubjectDeleteInput } from './input/subject-delete.input';
import { SubjectUpdateInput } from './input/subject-update.input';
import { SubjectService } from './subject.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Query(() => SubjectDto, {
    nullable: true,
    description: 'Поиск субъекта по id',
  })
  async subject(@Args() { id }: SubjectArgs) {
    return await this.subjectService.subject(id);
  }

  @Query(() => [SubjectDto], {
    nullable: true,
    description: 'Поиск субъекта по наименованию и пагинация',
  })
  async subjectList(@Args() { textFilter, page, paging }: SubjectListArgs) {
    return this.subjectService.subjectList(textFilter, page, paging);
  }

  @Mutation(() => SubjectDto)
  async subjectCreate(@Args('data') data: SubjectCreateInput) {
    return await this.subjectService.subjectCreate(data);
  }

  @Mutation(() => SubjectDto)
  async subjectUpdate(@Args('data') data: SubjectUpdateInput) {
    return await this.subjectService.subjectUpdate(data);
  }

  @Mutation(() => Int)
  async subjectDelete(@Args('data') data: SubjectDeleteInput) {
    return await this.subjectService.subjectDelete(data);
  }
}
