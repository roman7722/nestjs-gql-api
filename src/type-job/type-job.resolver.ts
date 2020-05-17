import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TypeJobListArgsDto } from './dto/args/type-job-list.args.dto';
import { TypeJobArgsDto } from './dto/args/type-job.args.dto';
import { TypeJobCreateInputDto } from './dto/input/type-job-create.input.dto';
import { TypeJobDeleteInputDto } from './dto/input/type-job-delete.input.dto';
import { TypeJobUpdateInputDto } from './dto/input/type-job-update.input.dto';
import { TypeJobDto } from './dto/type-job.dto';
import { TypeJobService } from './type-job.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class TypeJobResolver {
  constructor(private readonly typeJobService: TypeJobService) {}

  @Query(() => TypeJobDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async typeJob(@Args() { id }: TypeJobArgsDto) {
    return await this.typeJobService.typeJob(id);
  }

  @Query(() => [TypeJobDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async typeJobList(@Args() { textFilter, page, paging }: TypeJobListArgsDto) {
    return this.typeJobService.typeJobList(textFilter, page, paging);
  }

  @Mutation(() => TypeJobDto)
  async typeJobCreate(@Args('data') data: TypeJobCreateInputDto) {
    return await this.typeJobService.typeJobCreate(data);
  }

  @Mutation(() => TypeJobDto)
  async typeJobUpdate(@Args('data') data: TypeJobUpdateInputDto) {
    return await this.typeJobService.typeJobUpdate(data);
  }

  @Mutation(() => Int)
  async typeJobDelete(@Args('data') data: TypeJobDeleteInputDto) {
    return await this.typeJobService.typeJobDelete(data);
  }
}
