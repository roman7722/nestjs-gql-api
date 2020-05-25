import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FamilyStatusDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) familyStatusName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
