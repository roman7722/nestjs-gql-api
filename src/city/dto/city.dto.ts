import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class CityDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) cityName?: string;
}
