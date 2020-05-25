import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServiceGuideUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) serviceGuideName: string;
  @Field(() => Int, { nullable: false }) serviceCategoryId: number;
  @Field({ nullable: false }) showInCalc: boolean;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
}
