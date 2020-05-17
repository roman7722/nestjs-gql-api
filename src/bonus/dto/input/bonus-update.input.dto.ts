import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BonusUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => Int, { nullable: false }) bonusCategoryId: number;
  @Field(() => String, { nullable: false }) bonusName: string;
  @Field(() => Float, { nullable: false }) cost: number;
  @Field(() => String, { nullable: true }) rem: string;
  @Field({ nullable: false }) isCurrentOffer: boolean;
  @Field(() => Int, { nullable: false }) version: number;
}
