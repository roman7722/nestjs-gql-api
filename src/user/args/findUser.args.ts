import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class FindUserArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
