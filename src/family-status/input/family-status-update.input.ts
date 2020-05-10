import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FamilyStatusUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) familyStatusName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
