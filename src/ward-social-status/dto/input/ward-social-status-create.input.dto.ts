import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WardSocialStatusCreateInputDto {
  @Field(() => Int, { nullable: false }) wardId: number;
  @Field(() => [Int], { nullable: false }) socialStatusesIds: number[];
}
