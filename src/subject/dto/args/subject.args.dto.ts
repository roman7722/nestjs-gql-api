import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SubjectArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
