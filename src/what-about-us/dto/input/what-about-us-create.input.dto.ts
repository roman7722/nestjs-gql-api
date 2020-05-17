import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WhatAboutUsCreateInputDto {
  @Field({ nullable: false }) whatAboutUsName: string;
}
