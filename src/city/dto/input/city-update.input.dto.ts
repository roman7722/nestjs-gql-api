import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CityUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) cityName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
