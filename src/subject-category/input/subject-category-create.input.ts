import { Field, InputType } from 'type-graphql';

@InputType()
export class SubjectCategoryCreateInput {
  @Field({ nullable: false }) subjectCategoryName: string;
}
