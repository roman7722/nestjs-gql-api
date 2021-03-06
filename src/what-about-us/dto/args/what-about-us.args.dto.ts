import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class WhatAboutUsArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
