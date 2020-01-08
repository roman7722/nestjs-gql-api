import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoleArgs } from './args/user-role.args';
import { UserRolesArgs } from './args/user-roles.args';
import { UserRoleDto } from './dto/user-role.dto';
import { CreateUserRoleInput } from './inputs/user-role.create.input';
import { DeleteUserRoleInput } from './inputs/user-role.delete.input';
import { UpdateUserRoleInput } from './inputs/user-role.update.input';
import { UserRoleService } from './user-role.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN')
export class UserRoleResolver {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Roles('MANAGER')
  @Query(() => UserRoleDto, {
    name: 'userRole',
    description: 'Роль пользователя',
    nullable: false,
  })
  async userRole(@Args() { id }: UserRoleArgs) {
    return this.userRoleService.readUserRole(id);
  }

  @Roles('MANAGER')
  @Query(() => [UserRoleDto])
  async userRolesFiltered(@Args() { ids }: UserRolesArgs) {
    return await this.userRoleService.findUserRoles(ids);
  }

  @Mutation(() => UserRoleDto)
  async createUserRole(@Args('data') data: CreateUserRoleInput) {
    return await this.userRoleService.createUserRole(data);
  }

  @Mutation(() => UserRoleDto)
  async updateUserRole(
    @Args('data') { id, roleDescription }: UpdateUserRoleInput,
  ) {
    return await this.userRoleService.updateUserRole({ id, roleDescription });
  }

  @Mutation(() => UserRoleDto)
  async deleteUserRole(@Args('data') { id }: DeleteUserRoleInput) {
    return await this.userRoleService.deleteUserRole(id);
  }
}
