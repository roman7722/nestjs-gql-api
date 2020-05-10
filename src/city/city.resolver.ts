import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CityListArgs } from './args/city-list.args';
import { CityArgs } from './args/city.args';
import { CityService } from './city.service';
import { CityDto } from './dto/city.dto';
import { CityCreateInput } from './input/city-create.input';
import { CityDeleteInput } from './input/city-delete.input';
import { CityUpdateInput } from './input/city-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => CityDto, {
    nullable: true,
    description: 'Поиск населённого пункта по id',
  })
  async city(@Args() { id }: CityArgs) {
    return await this.cityService.city(id);
  }

  @Query(() => [CityDto], {
    nullable: true,
    description: 'Поиск населённого пункта по наименованию и пагинация',
  })
  async cityList(@Args() { textFilter, page, paging }: CityListArgs) {
    return this.cityService.cityList(textFilter, page, paging);
  }

  @Mutation(() => CityDto)
  async cityCreate(@Args('data') data: CityCreateInput) {
    return await this.cityService.cityCreate(data);
  }

  @Mutation(() => CityDto)
  async cityUpdate(@Args('data') data: CityUpdateInput) {
    return await this.cityService.cityUpdate(data);
  }

  @Mutation(() => Int)
  async cityDelete(@Args('data') data: CityDeleteInput) {
    return await this.cityService.cityDelete(data);
  }
}
