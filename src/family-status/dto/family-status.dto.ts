import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FamilyStatusDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) familyStatusName?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
