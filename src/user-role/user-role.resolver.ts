import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoleListArgsDto } from './dto/args/user-role-list.args.dto';
import { UserRoleArgsDto } from './dto/args/user-role.args.dto';
import { UserRolesArgsDto } from './dto/args/user-roles.args.dto';
import { UserRoleCreateInputDto } from './dto/input/user-role-create.input.dto';
import { UserRoleDeleteInputDto } from './dto/input/user-role-delete.input.dto';
import { UserRoleUpdateInputDto } from './dto/input/user-role-update.input.dto';
import { UserRoleDto } from './dto/user-role.dto';
import { UserRoleService } from './user-role.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN')
export class UserRoleResolver {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Roles('MANAGER')
  @Query(() => UserRoleDto, {
    name: 'userRole',
    nullable: true,
    description: 'Роль пользователя',
  })
  async userRole(@Args() { id }: UserRoleArgsDto) {
    return this.userRoleService.userRole(id);
  }

  @Query(() => [UserRoleDto], {
    nullable: true,
    description:
      'Поиск роли пользователя по наименованию роли (userRoleName) и пагинация',
  })
  async userRoleList(
    @Args() { textFilter, page, paging }: UserRoleListArgsDto,
  ) {
    return this.userRoleService.userRoleList(textFilter, page, paging);
  }

  @Roles('MANAGER')
  @Query(() => [UserRoleDto], {
    nullable: true,
    description:
      'Поиск группы ролей по [userRoleName]. Если отправить пустой массив, то возвращаются все роли.',
  })
  async userRoles(@Args() { userRoleNames }: UserRolesArgsDto) {
    return await this.userRoleService.userRoles(userRoleNames);
  }

  @Mutation(() => UserRoleDto)
  async userRoleCreate(@Args('data') data: UserRoleCreateInputDto) {
    return await this.userRoleService.userRoleCreate(data);
  }

  @Mutation(() => UserRoleDto)
  async userRoleUpdate(@Args('data') data: UserRoleUpdateInputDto) {
    return await this.userRoleService.userRoleUpdate(data);
  }

  @Mutation(() => Int)
  async userRoleDelete(@Args('data') data: UserRoleDeleteInputDto) {
    return await this.userRoleService.userRoleDelete(data);
  }
}
