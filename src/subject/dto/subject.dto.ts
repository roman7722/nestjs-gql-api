import { Field, ID, Int, ObjectType } from 'type-graphql';
import { SubjectCategoryDto } from '../../subject-category/dto/subject-category.dto';

@ObjectType()
export class SubjectDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) subjectName?: string;
  @Field(() => SubjectCategoryDto, { nullable: true })
  subjectCategory?: SubjectCategoryDto;
  @Field(() => Int, { nullable: true }) version?: number;
}
