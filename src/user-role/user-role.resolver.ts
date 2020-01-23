// import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { Roles } from '../auth/decorators/roles.decorator';
// import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoleArgs } from './args/user-role.args';
import { UserRolesArgs } from './args/user-roles.args';
import { UserRoleDto } from './dto/user-role.dto';
import { UserRoleCreateInput } from './input/user-role-create.input';
import { UserRoleDeleteInput } from './input/user-role-delete.input';
import { UserRoleUpdateInput } from './input/user-role-update.input';
import { UserRoleService } from './user-role.service';

@Resolver()
// @UseGuards(GqlAuthGuard, RolesGuard)
// @Roles('ADMIN')
export class UserRoleResolver {
  constructor(private readonly userRoleService: UserRoleService) {}

  // @Roles('MANAGER')
  @Query(() => UserRoleDto, {
    name: 'userRole',
    description: 'Роль пользователя',
    nullable: false,
  })
  async userRole(@Args() { id }: UserRoleArgs) {
    return this.userRoleService.userRole(id);
  }

  // @Roles('MANAGER')
  @Query(() => [UserRoleDto])
  async userRolesFind(@Args() { ids }: UserRolesArgs) {
    return await this.userRoleService.userRolesFind(ids);
  }

  @Mutation(() => UserRoleDto)
  async userRoleCreate(@Args('data') data: UserRoleCreateInput) {
    return await this.userRoleService.userRoleCreate(data);
  }

  @Mutation(() => UserRoleDto)
  async userRoleUpdate(@Args('data') data: UserRoleUpdateInput) {
    return await this.userRoleService.userRoleUpdate(data);
  }

  @Mutation(() => UserRoleDto)
  async userRoleDelete(@Args('data') { id }: UserRoleDeleteInput) {
    return await this.userRoleService.userRoleDelete(id);
  }
}
