import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BonusCategoryDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => String, { nullable: true }) bonusCategoryName?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
