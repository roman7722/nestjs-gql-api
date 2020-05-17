import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { BonusCategoryDto } from '../../bonus-category/dto/bonus-category.dto';

@ObjectType()
export class BonusDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => BonusCategoryDto, { nullable: true })
  bonusCategory?: BonusCategoryDto;
  @Field(() => String, { nullable: true }) bonusName?: string;
  @Field(() => Float, { nullable: true }) cost?: number;
  @Field(() => String, { nullable: true }) rem?: string;
  @Field({ nullable: true }) isCurrentOffer?: boolean;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
