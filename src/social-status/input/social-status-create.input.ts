import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SocialStatusCreateInput {
  @Field({ nullable: false }) socialStatusName: string;
}
