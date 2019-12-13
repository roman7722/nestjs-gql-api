import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UserRoleArgs {
  @Field(() => String, { nullable: false })
  id: string;
}
