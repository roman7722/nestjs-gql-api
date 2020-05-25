import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubjectCategoryDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) subjectCategoryName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
