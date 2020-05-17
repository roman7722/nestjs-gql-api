import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FamilyStatusUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) familyStatusName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
