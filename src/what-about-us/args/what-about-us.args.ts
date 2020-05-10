import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class WhatAboutUsArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
