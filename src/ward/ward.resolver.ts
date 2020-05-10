import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WardListArgs } from './args/ward-list.args';
import { WardArgs } from './args/ward.args';
import { WardDto } from './dto/ward.dto';
import { WardCreateInput } from './input/ward-create.input';
import { WardDeleteInput } from './input/ward-delete.input';
import { WardUpdateInput } from './input/ward-update.input';
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
  async ward(@Args() { id }: WardArgs) {
    return await this.wardService.ward(id);
  }

  @Query(() => [WardDto], {
    nullable: true,
    description: 'Поиск подопечного по имени и пагинация',
  })
  async wardList(@Args() { textFilter, page, paging }: WardListArgs) {
    return this.wardService.wardList(textFilter, page, paging);
  }

  @Mutation(() => WardDto)
  async wardCreate(@Args('data') data: WardCreateInput) {
    return await this.wardService.wardCreate(data);
  }

  @Mutation(() => WardDto)
  async wardUpdate(@Args('data') data: WardUpdateInput) {
    return await this.wardService.wardUpdate(data);
  }

  @Mutation(() => Int)
  async wardDelete(@Args('data') data: WardDeleteInput) {
    return await this.wardService.wardDelete(data);
  }
}
