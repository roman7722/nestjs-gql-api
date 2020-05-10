import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CityUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) cityName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
