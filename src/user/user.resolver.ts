import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserFindArgs } from './args/user-find.args';
import { UserListArgs } from './args/user-list.args';
import { UserArgs } from './args/user.args';
import { UserDto } from './dto/user.dto';
import { UserCreateInput } from './input/user-create.input';
import { UserDeleteInput } from './input/user-delete.input';
import { UserUpdateInput } from './input/user-update.input';
import { UserService } from './user.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles('MANAGER')
  @Query(() => UserDto, { nullable: true })
  async user(@Args() { id }: UserArgs) {
    return await this.userService.user(id);
  }

  @Query(() => [UserDto], {
    name: 'userList',
    description: 'Поиск пользователей по ФИО и пагинация',
  })
  async userList(@Args() { textFilter, page, paging }: UserListArgs) {
    return this.userService.userList(textFilter, page, paging);
  }

  @Query(() => [UserDto])
  async usersFind(@Args() data: UserFindArgs) {
    return this.userService.usersFind(data);
  }

  @Mutation(() => UserDto)
  async userCreate(@Args('data') data: UserCreateInput) {
    return await this.userService.userCreate(data);
  }

  @Mutation(() => UserDto)
  async userUpdate(@Args('data') data: UserUpdateInput) {
    return await this.userService.userUpdate(data);
  }

  @Mutation(() => Number)
  async userDelete(@Args('data') { id }: UserDeleteInput) {
    return await this.userService.userDelete(id);
  }
}
