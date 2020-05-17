import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SocialStatusUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) socialStatusName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
