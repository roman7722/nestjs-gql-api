import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class WhatAboutUsArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
