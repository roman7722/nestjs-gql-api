import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BonusCreateInputDto {
  @Field(() => Int, { nullable: false }) bonusCategoryId: number;
  @Field(() => String, { nullable: false }) bonusName: string;
  @Field(() => Float, { nullable: false }) cost: number;
  @Field(() => String, { nullable: true }) rem: string;
  @Field({ nullable: false }) isCurrentOffer: boolean;
}
