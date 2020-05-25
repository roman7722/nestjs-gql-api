import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServiceGuideCreateInputDto {
  @Field(() => String, { nullable: false }) serviceGuideName: string;
  @Field(() => Int, { nullable: false }) serviceCategoryId: number;
  @Field({ nullable: false }) showInCalc: boolean;
  @Field(() => String, { nullable: true }) rem: string;
}
