import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ExecutionStatusListArgsDto } from './dto/args/execution-status-list.args.dto';
import { ExecutionStatusArgsDto } from './dto/args/execution-status.args.dto';
import { ExecutionStatusDto } from './dto/execution-status.dto';
import { ExecutionStatusCreateInputDto } from './dto/input/execution-status-create.input.dto';
import { ExecutionStatusDeleteInputDto } from './dto/input/execution-status-delete.input.dto';
import { ExecutionStatusUpdateInputDto } from './dto/input/execution-status-update.input.dto';
import { ExecutionStatusService } from './execution-status.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class ExecutionStatusResolver {
  constructor(
    private readonly executionStatusService: ExecutionStatusService,
  ) {}

  @Query(() => ExecutionStatusDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async executionStatus(@Args() { id }: ExecutionStatusArgsDto) {
    return await this.executionStatusService.executionStatus(id);
  }

  @Query(() => [ExecutionStatusDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async executionStatusList(
    @Args() { textFilter, page, paging }: ExecutionStatusListArgsDto,
  ) {
    return this.executionStatusService.executionStatusList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => ExecutionStatusDto)
  async executionStatusCreate(
    @Args('data') data: ExecutionStatusCreateInputDto,
  ) {
    return await this.executionStatusService.executionStatusCreate(data);
  }

  @Mutation(() => ExecutionStatusDto)
  async executionStatusUpdate(
    @Args('data') data: ExecutionStatusUpdateInputDto,
  ) {
    return await this.executionStatusService.executionStatusUpdate(data);
  }

  @Mutation(() => Int)
  async executionStatusDelete(
    @Args('data') data: ExecutionStatusDeleteInputDto,
  ) {
    return await this.executionStatusService.executionStatusDelete(data);
  }
}
