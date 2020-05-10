import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FamilyStatusCreateInput {
  @Field({ nullable: false }) familyStatusName: string;
}
