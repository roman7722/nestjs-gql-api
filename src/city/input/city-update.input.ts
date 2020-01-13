import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CityUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: true }) cityName: string;
}
