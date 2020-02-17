import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class WardStageArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
