import { Int } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
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

  @Query(() => WardDto, { nullable: true })
  async ward(@Args() { id }: WardArgs) {
    return await this.wardService.ward(id);
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
