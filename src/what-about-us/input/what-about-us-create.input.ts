import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WhatAboutUsCreateInput {
  @Field({ nullable: false }) whatAboutUsName: string;
}
