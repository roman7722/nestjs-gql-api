import { Field, InputType } from 'type-graphql';

@InputType()
export class CustomerCategoryCreateInput {
  @Field({ nullable: false }) customerCategoryName: string;
}
