import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class FamilyStatusArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
