import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class UserRoleArgs {
  @Field(() => Int, { nullable: false })
  id: number;
}
