import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class QuarterDeleteInput {
  @Field(() => Int) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
