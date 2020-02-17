import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class FamilyStatusDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) familyStatusName?: string;
}
