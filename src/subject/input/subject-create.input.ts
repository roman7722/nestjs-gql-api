import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SubjectCreateInput {
  @Field({ nullable: false }) subjectName: string;
  @Field(() => Int, { nullable: false }) subjectCategoryId: number;
}
