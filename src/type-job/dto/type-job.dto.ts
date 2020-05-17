import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TypeJobDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => String, { nullable: true }) typeJobName?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
