import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WhatAboutUsDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) whatAboutUsName?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
