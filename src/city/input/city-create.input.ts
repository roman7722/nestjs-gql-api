import { Field, InputType } from 'type-graphql';

@InputType()
export class CityCreateInput {
  @Field({ nullable: false }) cityName: string;
}
