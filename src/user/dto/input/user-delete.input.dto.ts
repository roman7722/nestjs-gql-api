import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserDeleteInputDto {
  @Field(() => Int) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
