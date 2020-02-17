import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class QuarterListArgs {
  @Field(() => String, { nullable: true }) textFilter?: string;
  @Field(() => Int, { nullable: false }) paging: number;
  @Field(() => Int, { nullable: false }) page: number;
}
