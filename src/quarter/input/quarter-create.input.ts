import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QuarterCreateInput {
  @Field({ nullable: false }) quarterName: string;
  @Field(() => Int, { nullable: false }) districtId: number;
}
