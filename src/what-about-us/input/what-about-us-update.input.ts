import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class WhatAboutUsUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) whatAboutUsName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
