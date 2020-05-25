import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ServiceGridListArgsDto } from './dto/args/service-grid-list.args.dto';
import { ServiceGridArgsDto } from './dto/args/service-grid.args.dto';
import { ServiceGridCreateInputDto } from './dto/input/service-grid-create.input.dto';
import { ServiceGridDeleteInputDto } from './dto/input/service-grid-delete.input.dto';
import { ServiceGridUpdateInputDto } from './dto/input/service-grid-update.input.dto';
import { ServiceGridDto } from './dto/service-grid.dto';
import { ServiceGridService } from './service-grid.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class ServiceGridResolver {
  constructor(private readonly serviceGridService: ServiceGridService) {}

  @Query(() => ServiceGridDto, {
    nullable: true,
    description: 'Поиск услуги по id',
  })
  async serviceGrid(@Args() { id }: ServiceGridArgsDto) {
    return await this.serviceGridService.serviceGrid(id);
  }

  @Query(() => [ServiceGridDto], {
    nullable: true,
    description:
      'Поиск услуги по наименованию serviceGuideName из родительской таблицы s_service_guide и пагинация',
  })
  async serviceGridList(
    @Args() { textFilter, page, paging }: ServiceGridListArgsDto,
  ) {
    return this.serviceGridService.serviceGridList(textFilter, page, paging);
  }

  @Mutation(() => ServiceGridDto)
  async serviceGridCreate(@Args('data') data: ServiceGridCreateInputDto) {
    return await this.serviceGridService.serviceGridCreate(data);
  }

  @Mutation(() => ServiceGridDto)
  async serviceGridUpdate(@Args('data') data: ServiceGridUpdateInputDto) {
    return await this.serviceGridService.serviceGridUpdate(data);
  }

  @Mutation(() => Int)
  async serviceGridDelete(@Args('data') data: ServiceGridDeleteInputDto) {
    return await this.serviceGridService.serviceGridDelete(data);
  }
}
