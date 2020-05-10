import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerCategoryCreateInput {
  @Field({ nullable: false }) customerCategoryName: string;
}
