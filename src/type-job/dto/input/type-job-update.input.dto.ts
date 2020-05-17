import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class TypeJobUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) typeJobName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
