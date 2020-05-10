import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DistrictListArgs } from './args/district-list.args';
import { DistrictArgs } from './args/district.args';
import { DistrictService } from './district.service';
import { DistrictDto } from './dto/district.dto';
import { DistrictCreateInput } from './input/district-create.input';
import { DistrictDeleteInput } from './input/district-delete.input';
import { DistrictUpdateInput } from './input/district-update.input';

@Resolver()
@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class DistrictResolver {
  constructor(private readonly districtService: DistrictService) {}

  @Query(() => DistrictDto, {
    nullable: true,
    description: 'Поиск района по id',
  })
  async district(@Args() { id }: DistrictArgs) {
    return await this.districtService.district(id);
  }

  @Query(() => [DistrictDto], {
    nullable: true,
    description: 'Поиск района по наименованию и пагинация',
  })
  async districtList(@Args() { textFilter, page, paging }: DistrictListArgs) {
    return this.districtService.districtList(textFilter, page, paging);
  }

  @Mutation(() => DistrictDto)
  async districtCreate(@Args('data') data: DistrictCreateInput) {
    return await this.districtService.districtCreate(data);
  }

  @Mutation(() => DistrictDto)
  async districtUpdate(@Args('data') data: DistrictUpdateInput) {
    return await this.districtService.districtUpdate(data);
  }

  @Mutation(() => Int)
  async districtDelete(@Args('data') data: DistrictDeleteInput) {
    return await this.districtService.districtDelete(data);
  }
}
