import { Field, InputType } from 'type-graphql';

@InputType()
export class FamilyStatusCreateInput {
  @Field({ nullable: false }) familyStatusName: string;
}
