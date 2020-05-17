import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CityService } from './city.service';
import { CityListArgsDto } from './dto/args/city-list.args.dto';
import { CityArgsDto } from './dto/args/city.args.dto';
import { CityDto } from './dto/city.dto';
import { CityCreateInputDto } from './dto/input/city-create.input.dto';
import { CityDeleteInputDto } from './dto/input/city-delete.input.dto';
import { CityUpdateInputDto } from './dto/input/city-update.input.dto';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN')
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Roles('MANAGER')
  @Query(() => CityDto, {
    nullable: true,
    description: 'Поиск населённого пункта по id',
  })
  async city(@Args() { id }: CityArgsDto) {
    return await this.cityService.city(id);
  }

  @Query(() => [CityDto], {
    nullable: true,
    description: 'Поиск населённого пункта по наименованию и пагинация',
  })
  async cityList(@Args() { textFilter, page, paging }: CityListArgsDto) {
    return this.cityService.cityList(textFilter, page, paging);
  }

  @Roles('MANAGER')
  @Mutation(() => CityDto)
  async cityCreate(@Args('data') data: CityCreateInputDto) {
    return await this.cityService.cityCreate(data);
  }

  @Mutation(() => CityDto)
  async cityUpdate(@Args('data') data: CityUpdateInputDto) {
    return await this.cityService.cityUpdate(data);
  }

  @Mutation(() => Int)
  async cityDelete(@Args('data') data: CityDeleteInputDto) {
    return await this.cityService.cityDelete(data);
  }
}
