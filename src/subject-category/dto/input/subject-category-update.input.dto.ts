import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SubjectCategoryUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) subjectCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
