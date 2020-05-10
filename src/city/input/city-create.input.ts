import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CityCreateInput {
  @Field({ nullable: false }) cityName: string;
}
