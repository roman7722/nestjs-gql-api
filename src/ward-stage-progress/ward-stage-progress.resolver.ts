import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WardStageProgressListArgs } from './args/ward-stage-progress-list.args';
import { WardStageProgressArgs } from './args/ward-stage-progress.args';
import { WardStageProgressDto } from './dto/ward-stage-progress.dto';
import { WardStageProgressCreateInput } from './input/ward-stage-progress-create.input';
import { WardStageProgressDeleteInput } from './input/ward-stage-progress-delete.input';
import { WardStageProgressUpdateInput } from './input/ward-stage-progress-update.input';
import { WardStageProgressService } from './ward-stage-progress.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class WardStageProgressResolver {
  constructor(
    private readonly wardStageProgressService: WardStageProgressService,
  ) {}

  @Query(() => WardStageProgressDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async wardStageProgress(@Args() { id }: WardStageProgressArgs) {
    return await this.wardStageProgressService.wardStageProgress(id);
  }

  @Query(() => [WardStageProgressDto], {
    nullable: true,
    description:
      'Поиск социального статуса по wardId, наименованию и пагинация',
  })
  async wardStageProgressList(@Args() data: WardStageProgressListArgs) {
    return await this.wardStageProgressService.wardStageProgressList(data);
  }

  @Mutation(() => WardStageProgressDto)
  async wardStageProgressCreate(
    @Args('data') data: WardStageProgressCreateInput,
  ) {
    return await this.wardStageProgressService.wardStageProgressCreate(data);
  }

  @Mutation(() => WardStageProgressDto)
  async wardStageProgressUpdate(
    @Args('data') data: WardStageProgressUpdateInput,
  ) {
    return await this.wardStageProgressService.wardStageProgressUpdate(data);
  }

  @Mutation(() => Int)
  async wardStageProgressDelete(
    @Args('data') data: WardStageProgressDeleteInput,
  ) {
    return await this.wardStageProgressService.wardStageProgressDelete(data);
  }
}
