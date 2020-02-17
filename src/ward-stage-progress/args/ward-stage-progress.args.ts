import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class WardStageProgressArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
