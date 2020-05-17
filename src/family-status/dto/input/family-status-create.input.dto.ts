import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FamilyStatusCreateInputDto {
  @Field(() => String, { nullable: false }) familyStatusName: string;
}
