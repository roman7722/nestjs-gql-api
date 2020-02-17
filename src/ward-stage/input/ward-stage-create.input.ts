import { Field, InputType } from 'type-graphql';

@InputType()
export class WardStageCreateInput {
  @Field({ nullable: false }) wardStageName: string;
}
