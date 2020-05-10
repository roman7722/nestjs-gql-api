import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QuarterUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) quarterName: string;
  @Field(() => Int, { nullable: false }) districtId: number;
  @Field(() => Int, { nullable: false }) version: number;
}
