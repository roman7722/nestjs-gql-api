import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BonusCategoryUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) bonusCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
