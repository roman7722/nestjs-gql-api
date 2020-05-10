import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class PositionCreateInput {
  @Field({ nullable: false }) positionName: string;
  @Field(() => Float, { nullable: false }) tariff: number;
  @Field({ nullable: false }) isCurrentOffer: boolean;
}
