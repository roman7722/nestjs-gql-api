import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubjectCategoryCreateInputDto {
  @Field(() => String, { nullable: false }) subjectCategoryName: string;
}
