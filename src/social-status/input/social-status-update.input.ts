import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class SocialStatusUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) socialStatusName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
