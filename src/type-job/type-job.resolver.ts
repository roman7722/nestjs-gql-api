import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TypeJobListArgs } from './args/type-job-list.args';
import { TypeJobArgs } from './args/type-job.args';
import { TypeJobDto } from './dto/type-job.dto';
import { TypeJobCreateInput } from './input/type-job-create.input';
import { TypeJobDeleteInput } from './input/type-job-delete.input';
import { TypeJobUpdateInput } from './input/type-job-update.input';
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
  async typeJob(@Args() { id }: TypeJobArgs) {
    return await this.typeJobService.typeJob(id);
  }

  @Query(() => [TypeJobDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async typeJobList(@Args() { textFilter, page, paging }: TypeJobListArgs) {
    return this.typeJobService.typeJobList(textFilter, page, paging);
  }

  @Mutation(() => TypeJobDto)
  async typeJobCreate(@Args('data') data: TypeJobCreateInput) {
    return await this.typeJobService.typeJobCreate(data);
  }

  @Mutation(() => TypeJobDto)
  async typeJobUpdate(@Args('data') data: TypeJobUpdateInput) {
    return await this.typeJobService.typeJobUpdate(data);
  }

  @Mutation(() => Int)
  async typeJobDelete(@Args('data') data: TypeJobDeleteInput) {
    return await this.typeJobService.typeJobDelete(data);
  }
}
