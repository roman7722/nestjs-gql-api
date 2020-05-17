import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PositionListArgsDto } from './dto/args/position-list.args.dto';
import { PositionArgsDto } from './dto/args/position.args.dto';
import { PositionCreateInputDto } from './dto/input/position-create.input.dto';
import { PositionDeleteInputDto } from './dto/input/position-delete.input.dto';
import { PositionUpdateInputDto } from './dto/input/position-update.input.dto';
import { PositionDto } from './dto/position.dto';
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
  async position(@Args() { id }: PositionArgsDto) {
    return await this.positionService.position(id);
  }

  @Query(() => [PositionDto], {
    nullable: true,
    description: 'Поиск населённого пункта по наименованию и пагинация',
  })
  async positionList(
    @Args() { textFilter, page, paging }: PositionListArgsDto,
  ) {
    return this.positionService.positionList(textFilter, page, paging);
  }

  @Mutation(() => PositionDto)
  async positionCreate(@Args('data') data: PositionCreateInputDto) {
    return await this.positionService.positionCreate(data);
  }

  @Mutation(() => PositionDto)
  async positionUpdate(@Args('data') data: PositionUpdateInputDto) {
    return await this.positionService.positionUpdate(data);
  }

  @Mutation(() => Int)
  async positionDelete(@Args('data') data: PositionDeleteInputDto) {
    return await this.positionService.positionDelete(data);
  }
}
