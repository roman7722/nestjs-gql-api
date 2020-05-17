import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PositionUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) positionName: string;
  @Field(() => Float, { nullable: false }) tariff: number;
  @Field({ nullable: false }) isCurrentOffer: boolean;
  @Field(() => Int, { nullable: false }) version: number;
}
