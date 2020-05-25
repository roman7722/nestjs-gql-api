import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CustomerCategoryDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) customerCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
