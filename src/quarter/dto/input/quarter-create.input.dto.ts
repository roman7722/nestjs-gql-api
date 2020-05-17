import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QuarterCreateInputDto {
  @Field(() => String, { nullable: false }) quarterName: string;
  @Field(() => Int, { nullable: false }) districtId: number;
}
