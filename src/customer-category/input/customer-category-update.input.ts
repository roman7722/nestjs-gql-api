import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CustomerCategoryUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) customerCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
