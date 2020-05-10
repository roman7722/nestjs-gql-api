import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FamilyStatusDeleteInput {
  @Field(() => Int) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
