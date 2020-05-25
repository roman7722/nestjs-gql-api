import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServiceGridCreateInputDto {
  @Field(() => Int, { nullable: false }) serviceCategoryId: number;
  @Field(() => Int, { nullable: false }) serviceGuideId: number;
  @Field(() => Float, { nullable: false }) hoursFrom: number;
  @Field(() => Float, { nullable: false }) hoursTo: number;
  @Field(() => Float, { nullable: false }) workDayPrice: number;
  @Field(() => Float, { nullable: false }) restDayPrice: number;
  @Field(() => String, { nullable: true }) rem: string;
}
