import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SessionArgsDto {
  @Field(() => Number, { nullable: true }) userId?: number;
}
