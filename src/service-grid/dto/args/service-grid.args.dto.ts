import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ServiceGridArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
