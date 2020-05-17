import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DistrictService } from './district.service';
import { DistrictListArgsDto } from './dto/args/district-list.args.dto';
import { DistrictArgsDto } from './dto/args/district.args.dto';
import { DistrictDto } from './dto/district.dto';
import { DistrictCreateInputDto } from './dto/input/district-create.input.dto';
import { DistrictDeleteInputDto } from './dto/input/district-delete.input.dto';
import { DistrictUpdateInputDto } from './dto/input/district-update.input.dto';

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
  async district(@Args() { id }: DistrictArgsDto) {
    return await this.districtService.district(id);
  }

  @Query(() => [DistrictDto], {
    nullable: true,
    description: 'Поиск района по наименованию и пагинация',
  })
  async districtList(
    @Args() { textFilter, page, paging }: DistrictListArgsDto,
  ) {
    return this.districtService.districtList(textFilter, page, paging);
  }

  @Mutation(() => DistrictDto)
  async districtCreate(@Args('data') data: DistrictCreateInputDto) {
    return await this.districtService.districtCreate(data);
  }

  @Mutation(() => DistrictDto)
  async districtUpdate(@Args('data') data: DistrictUpdateInputDto) {
    return await this.districtService.districtUpdate(data);
  }

  @Mutation(() => Int)
  async districtDelete(@Args('data') data: DistrictDeleteInputDto) {
    return await this.districtService.districtDelete(data);
  }
}
