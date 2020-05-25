import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WardStageProgressListArgsDto } from './dto/args/ward-stage-progress-list.args.dto';
import { WardStageProgressArgsDto } from './dto/args/ward-stage-progress.args.dto';
import { WardStageProgressCreateInputDto } from './dto/input/ward-stage-progress-create.input.dto';
import { WardStageProgressDeleteInputDto } from './dto/input/ward-stage-progress-delete.input.dto';
import { WardStageProgressUpdateInputDto } from './dto/input/ward-stage-progress-update.input.dto';
import { WardStageProgressDto } from './dto/ward-stage-progress.dto';
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
    description: 'Поиск статуса прогресса работы с подопечным по id',
  })
  async wardStageProgress(@Args() { id }: WardStageProgressArgsDto) {
    return await this.wardStageProgressService.wardStageProgress(id);
  }

  @Query(() => [WardStageProgressDto], {
    nullable: true,
    description:
      'Поиск статуса прогресса работы с подопечным по полю примечание (rem) и пагинация',
  })
  async wardStageProgressList(@Args() data: WardStageProgressListArgsDto) {
    return await this.wardStageProgressService.wardStageProgressList(data);
  }

  @Mutation(() => WardStageProgressDto)
  async wardStageProgressCreate(
    @Args('data') data: WardStageProgressCreateInputDto,
  ) {
    return await this.wardStageProgressService.wardStageProgressCreate(data);
  }

  @Mutation(() => WardStageProgressDto)
  async wardStageProgressUpdate(
    @Args('data') data: WardStageProgressUpdateInputDto,
  ) {
    return await this.wardStageProgressService.wardStageProgressUpdate(data);
  }

  @Mutation(() => Int)
  async wardStageProgressDelete(
    @Args('data') data: WardStageProgressDeleteInputDto,
  ) {
    return await this.wardStageProgressService.wardStageProgressDelete(data);
  }
}
