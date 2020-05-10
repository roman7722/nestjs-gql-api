import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DistrictCreateInput {
  @Field({ nullable: false }) districtName: string;
  @Field(() => Int, { nullable: false }) cityId: number;
}
