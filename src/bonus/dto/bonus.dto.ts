import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BonusCategoryDto } from '../../bonus-category/dto/bonus-category.dto';

@ObjectType()
export class BonusDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => BonusCategoryDto, { nullable: false })
  bonusCategory: BonusCategoryDto;
  @Field(() => String, { nullable: false }) bonusName: string;
  @Field(() => Float, { nullable: false }) cost: number;
  @Field(() => String, { nullable: true }) rem: string;
  @Field({ nullable: false }) isCurrentOffer: boolean;
  @Field(() => Int, { nullable: false }) version: number;
  @Field({ nullable: false }) createdAt: Date;
  @Field({ nullable: false }) updatedAt: Date;
}
