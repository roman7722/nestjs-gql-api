import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WardStageListArgs } from './args/ward-stage-list.args';
import { WardStageArgs } from './args/ward-stage.args';
import { WardStageDto } from './dto/ward-stage.dto';
import { WardStageCreateInput } from './input/ward-stage-create.input';
import { WardStageDeleteInput } from './input/ward-stage-delete.input';
import { WardStageUpdateInput } from './input/ward-stage-update.input';
import { WardStageService } from './ward-stage.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class WardStageResolver {
  constructor(private readonly wardStageService: WardStageService) {}

  @Query(() => WardStageDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async wardStage(@Args() { id }: WardStageArgs) {
    return await this.wardStageService.wardStage(id);
  }

  @Query(() => [WardStageDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async wardStageList(@Args() { textFilter, page, paging }: WardStageListArgs) {
    return this.wardStageService.wardStageList(textFilter, page, paging);
  }

  @Mutation(() => WardStageDto)
  async wardStageCreate(@Args('data') data: WardStageCreateInput) {
    return await this.wardStageService.wardStageCreate(data);
  }

  @Mutation(() => WardStageDto)
  async wardStageUpdate(@Args('data') data: WardStageUpdateInput) {
    return await this.wardStageService.wardStageUpdate(data);
  }

  @Mutation(() => Int)
  async wardStageDelete(@Args('data') data: WardStageDeleteInput) {
    return await this.wardStageService.wardStageDelete(data);
  }
}
