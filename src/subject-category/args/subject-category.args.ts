import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class SubjectCategoryArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
