import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class DistrictUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) districtName: string;
  @Field(() => Int, { nullable: false }) cityId: number;
  @Field(() => Int, { nullable: false }) version: number;
}
