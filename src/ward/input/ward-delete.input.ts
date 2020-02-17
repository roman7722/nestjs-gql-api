import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class WardDeleteInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
