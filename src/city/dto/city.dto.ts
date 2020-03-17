import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class CityDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) cityName?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
