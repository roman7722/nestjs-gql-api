import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class WardArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
