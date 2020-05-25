import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceCategoryDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) serviceCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
