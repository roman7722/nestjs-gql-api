import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CityCreateInputDto {
  @Field(() => String, { nullable: false }) cityName: string;
}
