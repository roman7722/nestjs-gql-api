import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ServiceGuideListArgsDto } from './dto/args/service-guide-list.args.dto';
import { ServiceGuideArgsDto } from './dto/args/service-guide.args.dto';
import { ServiceGuideCreateInputDto } from './dto/input/service-guide-create.input.dto';
import { ServiceGuideDeleteInputDto } from './dto/input/service-guide-delete.input.dto';
import { ServiceGuideUpdateInputDto } from './dto/input/service-guide-update.input.dto';
import { ServiceGuideDto } from './dto/service-guide.dto';
import { ServiceGuideService } from './service-guide.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class ServiceGuideResolver {
  constructor(private readonly serviceGuideService: ServiceGuideService) {}

  @Query(() => ServiceGuideDto, {
    nullable: true,
    description: 'Поиск услуги по id',
  })
  async serviceGuide(@Args() { id }: ServiceGuideArgsDto) {
    return await this.serviceGuideService.serviceGuide(id);
  }

  @Query(() => [ServiceGuideDto], {
    nullable: true,
    description: 'Поиск услуги по наименованию и пагинация',
  })
  async serviceGuideList(
    @Args() { textFilter, page, paging }: ServiceGuideListArgsDto,
  ) {
    return this.serviceGuideService.serviceGuideList(textFilter, page, paging);
  }

  @Mutation(() => ServiceGuideDto)
  async serviceGuideCreate(@Args('data') data: ServiceGuideCreateInputDto) {
    return await this.serviceGuideService.serviceGuideCreate(data);
  }

  @Mutation(() => ServiceGuideDto)
  async serviceGuideUpdate(@Args('data') data: ServiceGuideUpdateInputDto) {
    return await this.serviceGuideService.serviceGuideUpdate(data);
  }

  @Mutation(() => Int)
  async serviceGuideDelete(@Args('data') data: ServiceGuideDeleteInputDto) {
    return await this.serviceGuideService.serviceGuideDelete(data);
  }
}
