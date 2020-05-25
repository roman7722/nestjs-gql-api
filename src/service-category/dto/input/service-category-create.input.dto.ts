import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ServiceCategoryCreateInputDto {
  @Field(() => String, { nullable: false }) serviceCategoryName: string;
}
