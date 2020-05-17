import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DistrictCreateInputDto {
  @Field(() => String, { nullable: false }) districtName: string;
  @Field(() => Int, { nullable: false }) cityId: number;
}
