import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class WardStageProgressDeleteInput {
  @Field(() => Int) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
