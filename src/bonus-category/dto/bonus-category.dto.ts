import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BonusCategoryDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) bonusCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
