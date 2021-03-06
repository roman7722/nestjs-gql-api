import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WhatAboutUsUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) whatAboutUsName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
