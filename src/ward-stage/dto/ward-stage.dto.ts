import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class WardStageDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) wardStageName?: string;
}
