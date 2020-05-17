import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UserFindArgsDto {
  @Field(() => Int, { nullable: true }) ids?: [];
  @Field(() => String, { nullable: true }) usernames?: [];
}
