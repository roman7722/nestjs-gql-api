import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FindUserArgs } from './args/findUser.args';
import { UserArgs } from './args/user.args';
import { UserListArgs } from './args/userList.args';
import { UserDto } from './dto/user.dto';
import { CreateUserInput } from './inputs/user.create.input';
import { DeleteUserInput } from './inputs/user.delete.input';
import { UpdateUserInput } from './inputs/user.update.input';
import { UserService } from './user.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles('MANAGER')
  @Query(() => UserDto, { nullable: true })
  async user(@Args() { id }: FindUserArgs) {
    return await this.userService.user(id);
  }

  @Query(() => [UserDto], {
    name: 'userList',
    description: 'Поиск пользователей и пагинация',
  })
  async userList(@Args() { textFilter, page, paging }: UserListArgs) {
    return this.userService.userList(textFilter, page, paging);
  }

  @Query(() => [UserDto])
  async usersFiltered(@Args() data: UserArgs) {
    return this.userService.usersFiltered(data);
  }

  @Mutation(() => UserDto)
  async createUser(@Args('data') data: CreateUserInput) {
    return await this.userService.createUser(data);
  }

  @Mutation(() => UserDto)
  async updateUser(@Args('data') data: UpdateUserInput) {
    return await this.userService.updateUser(data);
  }

  @Mutation(() => Number)
  async deleteUser(@Args('data') { id }: DeleteUserInput) {
    return await this.userService.deleteUser(id);
  }
}
