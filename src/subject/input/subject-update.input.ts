import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class SubjectUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) subjectName: string;
  @Field(() => Int, { nullable: false }) subjectCategoryId: number;
  @Field(() => Int, { nullable: false }) version: number;
}
