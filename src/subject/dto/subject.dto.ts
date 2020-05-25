import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SubjectCategoryDto } from '../../subject-category/dto/subject-category.dto';

@ObjectType()
export class SubjectDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) subjectName: string;
  @Field(() => SubjectCategoryDto, { nullable: false })
  subjectCategory: SubjectCategoryDto;
  @Field(() => Int, { nullable: false }) version: number;
}
