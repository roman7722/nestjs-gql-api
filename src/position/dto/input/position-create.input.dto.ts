import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class PositionCreateInputDto {
  @Field(() => String, { nullable: false }) positionName: string;
  @Field(() => Float, { nullable: false }) tariff: number;
  @Field({ nullable: false }) isCurrentOffer: boolean;
}
