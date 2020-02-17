import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class FamilyStatusUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: true }) familyStatusName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
