import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SubjectCategoryUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) subjectCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
