import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CustomerCategoryUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) customerCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
