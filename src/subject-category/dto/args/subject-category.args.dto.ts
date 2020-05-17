import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SubjectCategoryArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
