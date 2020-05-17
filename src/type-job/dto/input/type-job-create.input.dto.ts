import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TypeJobCreateInputDto {
  @Field(() => String, { nullable: false }) typeJobName: string;
}
