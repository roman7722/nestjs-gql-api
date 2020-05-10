import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PositionDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) positionName?: string;
  @Field(() => Float, { nullable: true }) tariff?: number;
  @Field({ nullable: true }) isCurrentOffer?: boolean;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
