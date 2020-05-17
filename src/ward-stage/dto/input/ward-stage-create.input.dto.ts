import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WardStageCreateInputDto {
  @Field({ nullable: false }) wardStageName: string;
}
