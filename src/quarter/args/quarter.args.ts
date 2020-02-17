import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class QuarterArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
