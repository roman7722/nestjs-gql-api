import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserFindArgsDto } from './dto/args/user-find.args.dto';
import { UserListArgsDto } from './dto/args/user-list.args.dto';
import { UserArgsDto } from './dto/args/user.args.dto';
import { UserCreateInputDto } from './dto/input/user-create.input.dto';
import { UserDeleteInputDto } from './dto/input/user-delete.input.dto';
import { UserUpdateInputDto } from './dto/input/user-update.input.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles('MANAGER')
  @Query(() => UserDto, { nullable: true })
  async user(@Args() { id }: UserArgsDto) {
    return await this.userService.user(id);
  }

  @Query(() => [UserDto], {
    name: 'userList',
    nullable: true,
    description: 'Поиск пользователей по ФИО и пагинация',
  })
  async userList(@Args() { textFilter, page, paging }: UserListArgsDto) {
    return this.userService.userList(textFilter, page, paging);
  }

  @Query(() => [UserDto], { nullable: true })
  async usersFind(@Args() data: UserFindArgsDto) {
    return this.userService.usersFind(data);
  }

  @Mutation(() => UserDto)
  async userCreate(@Args('data') data: UserCreateInputDto) {
    return await this.userService.userCreate(data);
  }

  @Mutation(() => UserDto)
  async userUpdate(@Args('data') data: UserUpdateInputDto) {
    return await this.userService.userUpdate(data);
  }

  @Mutation(() => Int)
  async userDelete(@Args('data') data: UserDeleteInputDto) {
    return await this.userService.userDelete(data);
  }
}
