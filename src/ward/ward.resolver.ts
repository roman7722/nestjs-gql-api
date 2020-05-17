import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WardListArgsDto } from './dto/args/ward-list.args.dto';
import { WardArgsDto } from './dto/args/ward.args.dto';
import { WardCreateInputDto } from './dto/input/ward-create.input.dto';
import { WardDeleteInputDto } from './dto/input/ward-delete.input.dto';
import { WardUpdateInputDto } from './dto/input/ward-update.input.dto';
import { WardDto } from './dto/ward.dto';
import { WardService } from './ward.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class WardResolver {
  constructor(private readonly wardService: WardService) {}

  @Query(() => WardDto, {
    nullable: true,
    description: 'Поиск подопечного по id',
  })
  async ward(@Args() { id }: WardArgsDto) {
    return await this.wardService.ward(id);
  }

  @Query(() => [WardDto], {
    nullable: true,
    description: 'Поиск подопечного по имени и пагинация',
  })
  async wardList(@Args() { textFilter, page, paging }: WardListArgsDto) {
    return this.wardService.wardList(textFilter, page, paging);
  }

  @Mutation(() => WardDto)
  async wardCreate(@Args('data') data: WardCreateInputDto) {
    return await this.wardService.wardCreate(data);
  }

  @Mutation(() => WardDto)
  async wardUpdate(@Args('data') data: WardUpdateInputDto) {
    return await this.wardService.wardUpdate(data);
  }

  @Mutation(() => Int)
  async wardDelete(@Args('data') data: WardDeleteInputDto) {
    return await this.wardService.wardDelete(data);
  }
}
