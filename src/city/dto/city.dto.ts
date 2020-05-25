import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CityDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: true }) cityName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
