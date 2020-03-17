import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CustomerUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) customerName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
