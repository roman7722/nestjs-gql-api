import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WardStageListArgsDto } from './dto/args/ward-stage-list.args.dto';
import { WardStageArgsDto } from './dto/args/ward-stage.args.dto';
import { WardStageCreateInputDto } from './dto/input/ward-stage-create.input.dto';
import { WardStageDeleteInputDto } from './dto/input/ward-stage-delete.input.dto';
import { WardStageUpdateInputDto } from './dto/input/ward-stage-update.input.dto';
import { WardStageDto } from './dto/ward-stage.dto';
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
  async wardStage(@Args() { id }: WardStageArgsDto) {
    return await this.wardStageService.wardStage(id);
  }

  @Query(() => [WardStageDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async wardStageList(
    @Args() { textFilter, page, paging }: WardStageListArgsDto,
  ) {
    return this.wardStageService.wardStageList(textFilter, page, paging);
  }

  @Mutation(() => WardStageDto)
  async wardStageCreate(@Args('data') data: WardStageCreateInputDto) {
    return await this.wardStageService.wardStageCreate(data);
  }

  @Mutation(() => WardStageDto)
  async wardStageUpdate(@Args('data') data: WardStageUpdateInputDto) {
    return await this.wardStageService.wardStageUpdate(data);
  }

  @Mutation(() => Int)
  async wardStageDelete(@Args('data') data: WardStageDeleteInputDto) {
    return await this.wardStageService.wardStageDelete(data);
  }
}
