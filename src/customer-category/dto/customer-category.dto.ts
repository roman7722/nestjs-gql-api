import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CustomerCategoryDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) customerCategoryName?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
