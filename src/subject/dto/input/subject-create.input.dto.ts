import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SubjectCreateInputDto {
  @Field(() => String, { nullable: false }) subjectName: string;
  @Field(() => Int, { nullable: false }) subjectCategoryId: number;
}
