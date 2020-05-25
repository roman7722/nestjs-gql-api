import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WhatAboutUsDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) whatAboutUsName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
