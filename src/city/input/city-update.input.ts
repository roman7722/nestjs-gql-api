import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CityUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) cityName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
