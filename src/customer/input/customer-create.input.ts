import { Field, InputType } from 'type-graphql';

@InputType()
export class CustomerCreateInput {
  @Field({ nullable: false }) customerName: string;
}
