import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class QuarterCreateInput {
  @Field({ nullable: false }) quarterName: string;
  @Field(() => Int, { nullable: false }) districtId: number;
}
