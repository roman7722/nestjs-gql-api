import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ServiceCategoryDto } from '../../service-category/dto/service-category.dto';

@ObjectType()
export class ServiceGuideDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) serviceGuideName: string;
  @Field(() => ServiceCategoryDto, { nullable: false })
  serviceCategory: ServiceCategoryDto;
  @Field({ nullable: false }) showInCalc: boolean;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
}
