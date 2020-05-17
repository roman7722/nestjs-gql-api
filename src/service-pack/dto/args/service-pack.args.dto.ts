import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ServicePackArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
