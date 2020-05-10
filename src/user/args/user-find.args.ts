import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UserFindArgs {
  @Field(() => Int, { nullable: true })
  ids?: [];

  @Field(() => String, { nullable: true })
  usernames?: [];
}
