import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServiceCategoryUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) serviceCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
