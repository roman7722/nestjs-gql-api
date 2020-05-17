import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class TypeJobDeleteInputDto {
  @Field(() => Int) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
