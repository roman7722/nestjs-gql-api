import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class WardSocialStatusCreateInput {
  @Field(() => Int, { nullable: false }) wardId: number;
  @Field(() => [Int], { nullable: false }) socialStatusesIds: number[];
}
