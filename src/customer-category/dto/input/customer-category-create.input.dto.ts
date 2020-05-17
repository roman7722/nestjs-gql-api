import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerCategoryCreateInputDto {
  @Field(() => String, { nullable: false }) customerCategoryName: string;
}
