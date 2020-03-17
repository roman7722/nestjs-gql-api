import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class CustomerDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) customerName?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
