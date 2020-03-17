import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class SubjectArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
