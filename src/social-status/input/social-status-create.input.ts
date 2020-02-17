import { Field, InputType } from 'type-graphql';

@InputType()
export class SocialStatusCreateInput {
  @Field({ nullable: false }) socialStatusName: string;
}
