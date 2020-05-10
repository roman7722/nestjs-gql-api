import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BonusCreateInput {
  @Field(() => Int, { nullable: false }) bonusCategoryId: number;
  @Field({ nullable: false }) bonusName: string;
  @Field(() => Float, { nullable: false }) cost: number;
  @Field({ nullable: true }) rem: string;
  @Field({ nullable: false }) isCurrentOffer: boolean;
}
