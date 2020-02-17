import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class WardStageDeleteInput {
  @Field(() => Int) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
