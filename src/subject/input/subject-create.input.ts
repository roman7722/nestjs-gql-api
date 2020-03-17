import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class SubjectCreateInput {
  @Field({ nullable: false }) subjectName: string;
  @Field(() => Int, { nullable: false }) subjectCategoryId: number;
}
