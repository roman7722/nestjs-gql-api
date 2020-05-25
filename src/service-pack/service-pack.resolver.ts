import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ServicePackListArgsDto } from './dto/args/service-pack-list.args.dto';
import { ServicePackArgsDto } from './dto/args/service-pack.args.dto';
import { ServicePackCreateInputDto } from './dto/input/service-pack-create.input.dto';
import { ServicePackDeleteInputDto } from './dto/input/service-pack-delete.input.dto';
import { ServicePackUpdateInputDto } from './dto/input/service-pack-update.input.dto';
import { ServicePackDto } from './dto/service-pack.dto';
import { ServicePackService } from './service-pack.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class ServicePackResolver {
  constructor(private readonly servicePackService: ServicePackService) {}

  @Query(() => ServicePackDto, {
    nullable: true,
    description: 'Поиск пакета услуг по id',
  })
  async servicePack(@Args() { id }: ServicePackArgsDto) {
    return await this.servicePackService.servicePack(id);
  }

  @Query(() => [ServicePackDto], {
    nullable: true,
    description:
      'Поиск пакета услуг по № договора или фамилиям заказчика или подопечного представленных в формате agreementNumber (customerSecondName/wardSecondName) и пагинация',
  })
  async servicePackList(
    @Args() { textFilter, page, paging }: ServicePackListArgsDto,
  ) {
    return this.servicePackService.servicePackList(textFilter, page, paging);
  }

  @Mutation(() => ServicePackDto)
  async servicePackCreate(@Args('data') data: ServicePackCreateInputDto) {
    return await this.servicePackService.servicePackCreate(data);
  }

  @Mutation(() => ServicePackDto)
  async servicePackUpdate(@Args('data') data: ServicePackUpdateInputDto) {
    return await this.servicePackService.servicePackUpdate(data);
  }

  @Mutation(() => Int)
  async servicePackDelete(@Args('data') data: ServicePackDeleteInputDto) {
    return await this.servicePackService.servicePackDelete(data);
  }
}
