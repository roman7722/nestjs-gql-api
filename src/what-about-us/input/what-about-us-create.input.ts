import { Field, InputType } from 'type-graphql';

@InputType()
export class WhatAboutUsCreateInput {
  @Field({ nullable: false }) whatAboutUsName: string;
}
