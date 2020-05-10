import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PositionListArgs } from './args/position-list.args';
import { PositionArgs } from './args/position.args';
import { PositionDto } from './dto/position.dto';
import { PositionCreateInput } from './input/position-create.input';
import { PositionDeleteInput } from './input/position-delete.input';
import { PositionUpdateInput } from './input/position-update.input';
import { PositionService } from './position.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class PositionResolver {
  constructor(private readonly positionService: PositionService) {}

  @Query(() => PositionDto, {
    nullable: true,
    description: 'Поиск населённого пункта по id',
  })
  async position(@Args() { id }: PositionArgs) {
    return await this.positionService.position(id);
  }

  @Query(() => [PositionDto], {
    nullable: true,
    description: 'Поиск населённого пункта по наименованию и пагинация',
  })
  async positionList(@Args() { textFilter, page, paging }: PositionListArgs) {
    return this.positionService.positionList(textFilter, page, paging);
  }

  @Mutation(() => PositionDto)
  async positionCreate(@Args('data') data: PositionCreateInput) {
    return await this.positionService.positionCreate(data);
  }

  @Mutation(() => PositionDto)
  async positionUpdate(@Args('data') data: PositionUpdateInput) {
    return await this.positionService.positionUpdate(data);
  }

  @Mutation(() => Int)
  async positionDelete(@Args('data') data: PositionDeleteInput) {
    return await this.positionService.positionDelete(data);
  }
}
