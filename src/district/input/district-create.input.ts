import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class DistrictCreateInput {
  @Field({ nullable: false }) districtName: string;
  @Field(() => Int, { nullable: false }) cityId: number;
}
