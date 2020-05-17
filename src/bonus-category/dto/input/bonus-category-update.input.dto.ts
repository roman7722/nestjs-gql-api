import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BonusCategoryUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) bonusCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
