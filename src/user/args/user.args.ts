import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class UserArgs {
  @Field(() => Int, { nullable: true })
  ids?: [];

  @Field(() => String, { nullable: true })
  usernames?: [];
}
