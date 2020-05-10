import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubjectCategoryCreateInput {
  @Field({ nullable: false }) subjectCategoryName: string;
}
