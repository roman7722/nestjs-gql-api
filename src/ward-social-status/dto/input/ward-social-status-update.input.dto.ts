import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WardSocialStatusUpdateInputDto {
  @Field(() => Int, { nullable: false }) wardId: number;
  @Field(() => [Int], { nullable: false }) oldSocialStatusesIds: number[];
  @Field(() => [Int], { nullable: false }) newSocialStatusesIds: number[];
}
