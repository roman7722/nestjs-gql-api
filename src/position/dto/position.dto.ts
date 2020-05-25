import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PositionDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) positionName: string;
  @Field(() => Float, { nullable: false }) tariff: number;
  @Field({ nullable: false }) isCurrentOffer: boolean;
  @Field(() => Int, { nullable: false }) version: number;
  @Field({ nullable: false }) createdAt: Date;
  @Field({ nullable: false }) updatedAt: Date;
}
