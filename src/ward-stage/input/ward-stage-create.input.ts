import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WardStageCreateInput {
  @Field({ nullable: false }) wardStageName: string;
}
