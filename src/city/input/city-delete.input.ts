import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CityDeleteInput {
  @Field(() => Int) id: number;
}
