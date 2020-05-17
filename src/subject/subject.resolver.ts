import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SubjectListArgsDto } from './dto/args/subject-list.args.dto';
import { SubjectArgsDto } from './dto/args/subject.args.dto';
import { SubjectCreateInputDto } from './dto/input/subject-create.input.dto';
import { SubjectDeleteInputDto } from './dto/input/subject-delete.input.dto';
import { SubjectUpdateInputDto } from './dto/input/subject-update.input.dto';
import { SubjectDto } from './dto/subject.dto';
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
  async subject(@Args() { id }: SubjectArgsDto) {
    return await this.subjectService.subject(id);
  }

  @Query(() => [SubjectDto], {
    nullable: true,
    description: 'Поиск субъекта по наименованию и пагинация',
  })
  async subjectList(@Args() { textFilter, page, paging }: SubjectListArgsDto) {
    return this.subjectService.subjectList(textFilter, page, paging);
  }

  @Mutation(() => SubjectDto)
  async subjectCreate(@Args('data') data: SubjectCreateInputDto) {
    return await this.subjectService.subjectCreate(data);
  }

  @Mutation(() => SubjectDto)
  async subjectUpdate(@Args('data') data: SubjectUpdateInputDto) {
    return await this.subjectService.subjectUpdate(data);
  }

  @Mutation(() => Int)
  async subjectDelete(@Args('data') data: SubjectDeleteInputDto) {
    return await this.subjectService.subjectDelete(data);
  }
}
