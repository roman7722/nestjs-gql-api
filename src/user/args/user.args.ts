import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class UserArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
