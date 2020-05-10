import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TypeJobCreateInput {
  @Field({ nullable: false }) typeJobName: string;
}
