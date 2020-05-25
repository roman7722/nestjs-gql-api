import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ServiceCategoryDto } from '../../service-category/dto/service-category.dto';
import { ServiceGuideDto } from '../../service-guide/dto/service-guide.dto';

@ObjectType()
export class ServiceGridDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => ServiceCategoryDto, { nullable: false })
  serviceCategory: ServiceCategoryDto;
  @Field(() => ServiceGuideDto, { nullable: false })
  serviceGuide: ServiceGuideDto;
  @Field(() => Float, { nullable: false }) hoursFrom: number;
  @Field(() => Float, { nullable: false }) hoursTo: number;
  @Field(() => Float, { nullable: false }) workDayPrice: number;
  @Field(() => Float, { nullable: false }) restDayPrice: number;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
  @Field({ nullable: false }) createdAt: Date;
  @Field({ nullable: false }) updatedAt: Date;
}
