import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QuarterDeleteInputDto {
  @Field(() => Int) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
