import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SubjectArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
